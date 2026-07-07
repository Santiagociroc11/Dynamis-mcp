#!/usr/bin/env node
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import * as z from "zod";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DYNAMIS_PATH
  ? path.resolve(process.env.DYNAMIS_PATH)
  : path.join(__dirname, "..", "data");
const FICHAS_DIR = path.join(DATA_DIR, "fichas");
const SINTESIS_DIR = path.join(DATA_DIR, "sintesis");
const INDICE_FILE = path.join(DATA_DIR, "indice_maestro.md");

function readMd(p: string): string {
  try { return fs.readFileSync(p, "utf8"); } catch { return ""; }
}

function listMdFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMdFiles(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

interface Ficha {
  modulo: string;
  nombre: string;
  content: string;
  experto: string;
}

function extractExperto(content: string): string {
  const m = content.match(/^EXPERTO:\s*(.+)$/m);
  return m ? m[1].trim() : "";
}

function loadFichas(): Ficha[] {
  return listMdFiles(FICHAS_DIR).map((p) => {
    const rel = path.relative(FICHAS_DIR, p).replace(/\\/g, "/");
    const modulo = rel.split("/")[0];
    const nombre = path.basename(p, ".md");
    const content = readMd(p);
    return { modulo, nombre, content, experto: extractExperto(content) };
  });
}

interface Sintesis {
  cluster: string;
  nombre: string;
  content: string;
}

function loadSintesis(): Sintesis[] {
  if (!fs.existsSync(SINTESIS_DIR)) return [];
  return fs.readdirSync(SINTESIS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const m = f.match(/^([A-Z])_/);
      const cluster = m ? m[1] : f.replace(".md", "");
      return { cluster, nombre: f, content: readMd(path.join(SINTESIS_DIR, f)) };
    });
}

function expertosFuente(cluster: string): string[] {
  const s = sintesis.find((x) => x.cluster === cluster.toUpperCase());
  if (!s) return [];
  const section = s.content.match(/EXPERTOS FUENTE:\s*([\s\S]*?)(?=\n---|\n## |\n===|$)/);
  if (!section) return [];
  return [...section[1].matchAll(/\*\*([^*]+)\*\*/g)].map((m) => m[1].trim());
}

const fichas = loadFichas();
const sintesis = loadSintesis();

const server = new McpServer({
  name: "dynamis",
  version: "1.0.0",
});

server.registerResource(
  "indice",
  "dynamis://indice",
  {
    title: "Indice maestro DYNAMIS",
    description: "Mapa de las 66 fichas y 16 clusters",
    mimeType: "text/markdown",
  },
  async () => ({
    contents: [{ uri: "dynamis://indice", text: readMd(INDICE_FILE) }],
  })
);

server.registerResource(
  "ficha",
  new ResourceTemplate("dynamis://ficha/{modulo}/{nombre}", {
    list: async () => ({
      resources: fichas.map((f) => ({
        uri: `dynamis://ficha/${f.modulo}/${f.nombre}`,
        name: f.nombre,
      })),
    }),
  }),
  {
    title: "Ficha de experto",
    description: "Doctrina cruda de una transcripcion",
    mimeType: "text/markdown",
  },
  async (uri, { modulo, nombre }) => {
    const f = fichas.find((x) => x.modulo === String(modulo) && x.nombre === String(nombre));
    if (!f) return { contents: [{ uri: uri.href, text: "Ficha no encontrada" }] };
    return { contents: [{ uri: uri.href, text: f.content }] };
  }
);

server.registerResource(
  "sintesis",
  new ResourceTemplate("dynamis://sintesis/{cluster}", {
    list: async () => ({
      resources: sintesis.map((s) => ({
        uri: `dynamis://sintesis/${s.cluster}`,
        name: s.nombre,
      })),
    }),
  }),
  {
    title: "Sintesis cross-experto",
    description: "Modelo integrado por cluster",
    mimeType: "text/markdown",
  },
  async (uri, { cluster }) => {
    const s = sintesis.find((x) => x.cluster === String(cluster).toUpperCase());
    if (!s) return { contents: [{ uri: uri.href, text: "Sintesis no encontrada" }] };
    return { contents: [{ uri: uri.href, text: s.content }] };
  }
);

server.registerTool(
  "buscar_doctrina",
  {
    description:
      "Busca en las 66 fichas y 8 sintesis de DYNAMIS por palabra clave. Filtra opcionalmente por experto o cluster (letra A-I). Devuelve pasajes relevantes con atribucion.",
    inputSchema: {
      query: z.string().describe("Palabra o frase a buscar"),
      experto: z.string().optional().describe("Filtrar por nombre de experto"),
      cluster: z.string().optional().describe("Letra de cluster: A, C, D, E, F, G, H, I"),
    },
  },
  async (args) => {
    const query = String(args.query ?? "");
    const experto = args.experto ? String(args.experto) : undefined;
    const cluster = args.cluster ? String(args.cluster) : undefined;
    const q = query.toLowerCase();
    const results: string[] = [];
    for (const f of fichas) {
      if (experto && !f.experto.toLowerCase().includes(experto.toLowerCase())) continue;
      const idx = f.content.toLowerCase().indexOf(q);
      if (idx >= 0) {
        const start = Math.max(0, idx - 100);
        const snippet = f.content.slice(start, idx + 200).replace(/\n+/g, " ");
        results.push(`[Ficha ${f.modulo}/${f.nombre} - ${f.experto}] ...${snippet}...`);
      }
    }
    for (const s of sintesis) {
      if (cluster && s.cluster !== cluster.toUpperCase()) continue;
      const idx = s.content.toLowerCase().indexOf(q);
      if (idx >= 0) {
        const start = Math.max(0, idx - 100);
        const snippet = s.content.slice(start, idx + 200).replace(/\n+/g, " ");
        results.push(`[Sintesis ${s.cluster}] ...${snippet}...`);
      }
    }
    const text = results.length === 0
      ? `Sin resultados para "${query}".`
      : `Encontrados ${results.length} pasajes:\n\n${results.slice(0, 15).join("\n\n")}`;
    return { content: [{ type: "text" as const, text }] };
  }
);

server.registerTool(
  "validar_atribucion",
  {
    description:
      "Anti-fantasma: verifica si un experto esta en EXPERTOS FUENTE de un cluster antes de citarlo. Devuelve valido/no valido + la lista de expertos fuente del cluster.",
    inputSchema: {
      experto: z.string().describe("Nombre del experto a validar"),
      cluster: z.string().describe("Letra de cluster: A, C, D, E, F, G, H, I"),
    },
  },
  async (args) => {
    const experto = String(args.experto ?? "");
    const cluster = String(args.cluster ?? "");
    const fuentes = expertosFuente(cluster);
    if (fuentes.length === 0) {
      return {
        content: [{ type: "text" as const, text: `Cluster ${cluster} no encontrado o sin seccion EXPERTOS FUENTE.` }],
      };
    }
    const valido = fuentes.some((f) => f.toLowerCase().includes(experto.toLowerCase()));
    const text = valido
      ? `VALIDO: "${experto}" esta en EXPERTOS FUENTE del cluster ${cluster}.\n\nExpertos fuente: ${fuentes.join(", ")}`
      : `NO VALIDO (fantasma): "${experto}" NO esta en EXPERTOS FUENTE del cluster ${cluster}. No lo cites como doctrina de ese cluster.\n\nExpertos fuente: ${fuentes.join(", ")}`;
    return { content: [{ type: "text" as const, text }] };
  }
);

const SKILL_MAP = [
  { skill: "estructura-lanzamiento-cierre", cluster: "A", keywords: ["lanzamiento", "carrito", "cierre", "escasez", "evento", "webinar", "meteorico", "meteórico", "launch", "open cart", "calentamiento", "pitch", "anclaje"] },
  { skill: "whatsapp-grupos-cierre", cluster: "C", keywords: ["whatsapp", "grupo", "manada", "anti-baneo", "baneo", "recuperacion", "recuperación", "checkout", "numero", "chip", "ventana 24h"] },
  { skill: "ads-infoproductos + creativos-imagen-brunson (insumo D)", cluster: "D", keywords: ["trafico", "tráfico", "creativos", "pauta", "ads", "meta", "tiktok", "quiz", "cpl", "roas", "anuncio", "reel", "testing de creativos"] },
  { skill: "equipo-comercial-closers", cluster: "E", keywords: ["closer", "comercial", "lista de espera", "high ticket", "ht", "setter", "ventas 1-a-1", "llamada", "cierre 1-a-1"] },
  { skill: "oferta-anclaje-backend", cluster: "F", keywords: ["oferta", "anclaje", "precio", "escalera", "backend", "ltv", "combo", "vitalicio", "order bump", "cac", "upsell", "refund"] },
  { skill: "ecosistema-escalera-valor", cluster: "G", keywords: ["ecosistema", "recurrencia", "membresia", "membresía", "downsell", "upsell", "ltv", "pertenencia", "churn", "retencion", "retención", "recurrente"] },
  { skill: "agencia-equipos-contratacion", cluster: "H", keywords: ["agencia", "equipo", "contratacion", "contratación", "nomina", "nómina", "organigrama", "po", "project owner", "freelancer", "coproduccion", "coproducción", "head"] },
  { skill: "operacion-agil-delegacion", cluster: "I", keywords: ["operacion", "operación", "delegar", "procesos", "sprint", "scrum", "kanban", "blueprint", "daily", "checklist", "flujograma", "tarea perfecta"] },
];

server.registerTool(
  "que_skill_aplica",
  {
    description:
      "Meta-indice: dado un problema, devuelve que skill DYNAMIS invocar y el cluster fuente. Usalo PRIMERO cuando no sepas que skill aplica.",
    inputSchema: {
      problema: z.string().describe("Descripcion del problema u objetivo"),
    },
  },
  async (args) => {
    const problema = String(args.problema ?? "");
    const p = problema.toLowerCase();
    const matches = SKILL_MAP.filter((s) => s.keywords.some((k) => p.includes(k)));
    const text = matches.length === 0
      ? `No hay match claro. Empezá por el meta-indice. Tensiones transversales a cruzar: low vs high ticket, automatizacion vs humano, volumen vs calificacion, picos vs recurrencia.`
      : matches.map((s) => `-> ${s.skill} (cluster ${s.cluster})`).join("\n");
    return { content: [{ type: "text" as const, text: `Skill sugerido para "${problema}":\n\n${text}` }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

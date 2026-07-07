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
const SKILLS_DIR = path.join(DATA_DIR, "skills");
const INDICE_FILE = path.join(DATA_DIR, "indice_maestro.md");

function readMd(p: string): string {
  try { return fs.readFileSync(p, "utf8"); } catch { return ""; }
}

function norm(s: string): string {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
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

function listSubdirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
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

interface Skill {
  nombre: string;
  content: string;
}

function loadSkills(): Skill[] {
  return listSubdirs(SKILLS_DIR).map((name) => ({
    nombre: name,
    content: readMd(path.join(SKILLS_DIR, name, "SKILL.md")),
  }));
}

function expertosFuente(cluster: string): string[] {
  const s = sintesis.find((x) => x.cluster === cluster.toUpperCase());
  if (!s) return [];
  const section = s.content.match(/EXPERTOS FUENTE:\s*([\s\S]*?)(?=\n---|\n## |\n===|$)/);
  if (!section) return [];
  return [...section[1].matchAll(/\*\*([^*]+)\*\*/g)].map((m) => m[1].trim());
}

// Extrae items de la sección AUDITORÍA EXPRESS de una síntesis, separados ★ / ◇
function extraerAuditoria(cluster: string): { consensus: string[]; single: string[] } {
  const s = sintesis.find((x) => x.cluster === cluster.toUpperCase());
  if (!s) return { consensus: [], single: [] };
  const section = s.content.match(/## AUDITOR[AÍ]A EXPRESS[\s\S]*?(?=\n## |\n===|$)/i);
  if (!section) return { consensus: [], single: [] };
  const consensus: string[] = [];
  const single: string[] = [];
  const re = /^\d+\.\s*(★|◇)\s*(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section[0])) !== null) {
    const item = m[2].replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\s+/g, " ").trim();
    if (m[1] === "★") consensus.push(item);
    else single.push(item);
  }
  return { consensus, single };
}

// Extrae la tabla de benchmarks de una síntesis
function extraerBenchmarks(cluster: string): string[] {
  const s = sintesis.find((x) => x.cluster === cluster.toUpperCase());
  if (!s) return [];
  const section = s.content.match(/## BENCHMARKS[\s\S]*?(?=\n## |\n===|$)/i);
  if (!section) return [];
  const rows: string[] = [];
  for (const line of section[0].split("\n")) {
    const t = line.trim();
    if (t.startsWith("|") && !t.match(/^\|[-:\s|]+\|$/) && !/^\|\s*(Métrica|Mé|Métrica|Metrica)/i.test(t)) {
      rows.push(t);
    }
  }
  return rows;
}

// Extrae los huecos declarados en una síntesis
function extraerHuecos(cluster: string): string[] {
  const s = sintesis.find((x) => x.cluster === cluster.toUpperCase());
  if (!s) return [];
  const section = s.content.match(/## HUECOS[\s\S]*?(?=\n## |\n===|$)/i);
  if (!section) return [];
  const items: string[] = [];
  for (const line of section[0].split("\n")) {
    const t = line.trim();
    if (t.startsWith("- ")) items.push(t.replace(/^-\s*/, ""));
  }
  return items;
}

const fichas = loadFichas();
const sintesis = loadSintesis();
const skills = loadSkills();

const SKILL_BY_CLUSTER: Record<string, string> = {
  A: "estructura-lanzamiento-cierre",
  C: "whatsapp-grupos-cierre",
  D: "ads-infoproductos + creativos-imagen-brunson (insumo D)",
  E: "equipo-comercial-closers",
  F: "oferta-anclaje-backend",
  G: "ecosistema-escalera-valor",
  H: "agencia-equipos-contratacion",
  I: "operacion-agil-delegacion",
};

const SESGO_VINICIUS: Record<string, { pct: string; lectura: string }> = {
  A: { pct: "~50% (4/8)", lectura: "Dominante; consensos verificados." },
  C: { pct: "0% (ausente)", lectura: "Sesgo distinto: la voz sobre-representada es Daniel Marcovich." },
  D: { pct: "~33% (2/6)", lectura: "Muy confiable. 4 voces independientes densas." },
  E: { pct: "~43% (3/7)", lectura: "Confiable. Dominante pero con 4 independientes." },
  F: { pct: "~17% (1/6)", lectura: "Mas confiable. Consensos reales de 6 operadores." },
  G: { pct: "~67% (4/6)", lectura: "Cuidado. Toda la arquitectura es doctrina de una voz." },
  H: { pct: "~86% (6/7)", lectura: "Alerta. Es el modelo de UNA agencia, no consenso." },
  I: { pct: "~86% (6/7)", lectura: "Alerta doble. El segundo experto (Flavio) es COO de Vinícius: cero validacion externa." },
};

const server = new McpServer({
  name: "dynamis",
  version: "1.1.0",
});

// ============ RESOURCES ============

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

server.registerResource(
  "skill",
  new ResourceTemplate("dynamis://skill/{nombre}", {
    list: async () => ({
      resources: skills.map((s) => ({
        uri: `dynamis://skill/${s.nombre}`,
        name: s.nombre,
      })),
    }),
  }),
  {
    title: "Skill operativo DYNAMIS",
    description: "Skill de Cursor con arsenal, tensiones y auditoria",
    mimeType: "text/markdown",
  },
  async (uri, { nombre }) => {
    const s = skills.find((x) => x.nombre === String(nombre));
    if (!s) return { contents: [{ uri: uri.href, text: "Skill no encontrado" }] };
    return { contents: [{ uri: uri.href, text: s.content }] };
  }
);

server.registerResource(
  "tensiones",
  "dynamis://tensiones",
  {
    title: "Tensiones transversales DYNAMIS",
    description: "Las 6 decisiones madre que cruzan clusters (low vs high ticket, automatizacion vs humano, etc.)",
    mimeType: "text/markdown",
  },
  async () => {
    const idx = skills.find((s) => s.nombre === "dynamis-index");
    const section = idx?.content.match(/## Tensiones transversales[\s\S]*?(?=\n## |\n---$)/);
    const text = section ? section[0] : "Tensiones transversales no encontradas en dynamis-index.";
    return { contents: [{ uri: "dynamis://tensiones", text }] };
  }
);

// ============ TOOLS ============

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
    const terms = norm(query).split(/\s+/).filter(Boolean);
    const score = (text: string) => terms.reduce((n, t) => n + (norm(text).includes(t) ? 1 : 0), 0);
    const results: { src: string; snippet: string; sc: number }[] = [];
    for (const f of fichas) {
      if (experto && !norm(f.experto).includes(norm(experto))) continue;
      const lc = norm(f.content);
      if (!terms.every((t) => lc.includes(t))) {
        const anyMatch = terms.some((t) => lc.includes(t));
        if (!anyMatch) continue;
      }
      const firstIdx = terms.map((t) => lc.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
      const start = Math.max(0, firstIdx - 100);
      const snippet = f.content.slice(start, firstIdx + 200).replace(/\n+/g, " ");
      results.push({ src: `Ficha ${f.modulo}/${f.nombre} - ${f.experto}`, snippet, sc: score(f.content) });
    }
    for (const s of sintesis) {
      if (cluster && s.cluster !== cluster.toUpperCase()) continue;
      const lc = norm(s.content);
      if (!terms.every((t) => lc.includes(t))) {
        const anyMatch = terms.some((t) => lc.includes(t));
        if (!anyMatch) continue;
      }
      const firstIdx = terms.map((t) => lc.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
      const start = Math.max(0, firstIdx - 100);
      const snippet = s.content.slice(start, firstIdx + 200).replace(/\n+/g, " ");
      results.push({ src: `Sintesis ${s.cluster}`, snippet, sc: score(s.content) });
    }
    results.sort((a, b) => b.sc - a.sc);
    const text = results.length === 0
      ? `Sin resultados para "${query}".`
      : `Encontrados ${results.length} pasajes (ordenados por relevancia):\n\n` +
        results.slice(0, 15).map((r) => `[${r.src}] ...${r.snippet}...`).join("\n\n");
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

server.registerTool(
  "auditar_cluster",
  {
    description:
      "Devuelve el checklist de auditoria de un cluster separado en consensos reales (★) y voces unicas (◇). Regla DYNAMIS: ante recursos limitados, primero cerrar todos los ★, despues los ◇. Usalo para auditar un lanzamiento/cierre en curso.",
    inputSchema: {
      cluster: z.string().describe("Letra de cluster: A, C, D, E, F, G, H, I"),
    },
  },
  async (args) => {
    const cluster = String(args.cluster ?? "").toUpperCase();
    const { consensus, single } = extraerAuditoria(cluster);
    const skill = SKILL_BY_CLUSTER[cluster];
    if (consensus.length === 0 && single.length === 0) {
      return { content: [{ type: "text" as const, text: `No se encontro auditoria para cluster ${cluster}.` }] };
    }
    const text =
      `Auditoria cluster ${cluster}${skill ? ` (skill: ${skill})` : ""}:\n\n` +
      `★ CONSENSO REAL (van primero, ${consensus.length}):\n` +
      consensus.map((c, i) => `${i + 1}. ★ ${c}`).join("\n") +
      `\n\n◇ UNA VOZ (upside tactico, despues, ${single.length}):\n` +
      single.map((c, i) => `${i + 1}. ◇ ${c}`).join("\n") +
      `\n\nLectura: faltan ★ = plata gruesa sobre la mesa. Los ◇ son apuesta de un solo operador, no ley.`;
    return { content: [{ type: "text" as const, text }] };
  }
);

server.registerTool(
  "get_benchmark",
  {
    description:
      "Devuelve los benchmarks de un cluster (o de todos si no se especifica). Preserva los marcadores [¿?] que indican numeros heredados de transcripciones sucias: verificar antes de proyectar caja. Filtra opcionalmente por metrica.",
    inputSchema: {
      cluster: z.string().optional().describe("Letra de cluster: A, C, D, E, F, G, H, I"),
      metrica: z.string().optional().describe("Palabra clave de metrica (ej. conversion, cpl, roas, show-up)"),
    },
  },
  async (args) => {
    const cluster = args.cluster ? String(args.cluster).toUpperCase() : undefined;
    const metrica = args.metrica ? String(args.metrica).toLowerCase() : undefined;
    const targets = cluster ? sintesis.filter((s) => s.cluster === cluster) : sintesis;
    const lines: string[] = [];
    for (const s of targets) {
      const rows = extraerBenchmarks(s.cluster);
      if (rows.length === 0) continue;
      const filtered = metrica ? rows.filter((r) => norm(r).includes(norm(metrica))) : rows;
      if (filtered.length === 0) continue;
      lines.push(`## Cluster ${s.cluster}`);
      lines.push(...filtered);
      lines.push("");
    }
    const text = lines.length === 0
      ? `No se encontraron benchmarks${cluster ? ` para cluster ${cluster}` : ""}${metrica ? ` con metrica "${metrica}"` : ""}.`
      : `Benchmarks (preservar [¿?] — verificar antes de proyectar caja):\n\n` + lines.join("\n");
    return { content: [{ type: "text" as const, text }] };
  }
);

server.registerTool(
  "sesgo_cluster",
  {
    description:
      "Devuelve el sesgo Vinícius del cluster (porcentaje de fichas suyas) y la lectura de confianza. Regla: cuanto mas alto el %, mas tratar los ★ como hipotesis fuerte de un arquitecto y menos como verdad del campo. En G/H/I contrastar con fuentes externas antes de adoptar como ley.",
    inputSchema: {
      cluster: z.string().describe("Letra de cluster: A, C, D, E, F, G, H, I"),
    },
  },
  async (args) => {
    const cluster = String(args.cluster ?? "").toUpperCase();
    const sesgo = SESGO_VINICIUS[cluster];
    const fuentes = expertosFuente(cluster);
    if (!sesgo) {
      return { content: [{ type: "text" as const, text: `Cluster ${cluster} no encontrado.` }] };
    }
    const text =
      `Sesgo cluster ${cluster}:\n\n` +
      `- % fichas Vinícius: ${sesgo.pct}\n` +
      `- Lectura de confianza: ${sesgo.lectura}\n` +
      (fuentes.length ? `- Expertos fuente: ${fuentes.join(", ")}` : "");
    return { content: [{ type: "text" as const, text }] };
  }
);

server.registerTool(
  "listar_huecos",
  {
    description:
      "Lista los huecos conocidos de un cluster (o de todos): lo que DYNAMIS NO cubre y la fuente externa asignada. Usalo antes de buscar doctrina fuera del corpus y para saber qué documentar en OPERADOR.md.",
    inputSchema: {
      cluster: z.string().optional().describe("Letra de cluster: A, C, D, E, F, G, H, I"),
    },
  },
  async (args) => {
    const cluster = args.cluster ? String(args.cluster).toUpperCase() : undefined;
    const targets = cluster ? sintesis.filter((s) => s.cluster === cluster) : sintesis;
    const lines: string[] = [];
    for (const s of targets) {
      const huecos = extraerHuecos(s.cluster);
      if (huecos.length === 0) continue;
      lines.push(`## Cluster ${s.cluster}`);
      huecos.forEach((h) => lines.push(`- ${h}`));
      lines.push("");
    }
    const text = lines.length === 0
      ? `No se encontraron huecos${cluster ? ` para cluster ${cluster}` : ""}.`
      : `Huecos conocidos (buscar afuera / documentar en OPERADOR.md):\n\n` + lines.join("\n");
    return { content: [{ type: "text" as const, text }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

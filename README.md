# DYNAMIS — Sistema de doctrina de lanzamientos y ventas

Sistema portable de doctrina operativa para infoproductos, construido a partir de 66 fichas de expertos agrupadas en 8 clusters (A, C, D, E, F, G, H, I). Incluye síntesis cross-experto, skills para Cursor, un meta-índice, y un **MCP server** para usar la doctrina desde cualquier cliente MCP (Cursor, Claude Desktop, Windsurf, Continue, Cline, etc.).

La doctrina de los expertos vive **separada del contexto del operador**. Cada usuario completa su propio `CEREBRO/OPERADOR.md` (no se commitea).

---

## MCP server — usar DYNAMIS desde cualquier cliente

El repo es también un paquete MCP ejecutable. Sin publicar a npmjs.com, cualquiera puede usarlo directo desde GitHub con `npx`.

### Cursor — editar `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "dynamis": {
      "command": "npx",
      "args": ["-y", "github:Santiagociroc11/Dynamis-mcp"]
    }
  }
}
```

### Claude Desktop / otros clientes MCP

Mismo comando `npx -y github:Santiagociroc11/Dynamis-mcp` sobre stdio. Al primer arranque, `npx` clona el repo, ejecuta `npm install` (que dispara `postinstall` → `npm run build` y genera `dist/` + `data/`), y arranca el servidor.

### Alternativa local (si `npx` falla en tu entorno)

En algunos entornos Windows con Node muy nuevo, `npx.cmd` puede fallar al resolver `npx-cli.js`. Si `npx -y github:...` no arranca, usa el bin local directamente:

```bash
git clone https://github.com/Santiagociroc11/Dynamis-mcp.git
cd Dynamis-mcp
npm install        # instala deps + genera dist/ y data/ via postinstall
```

Y en el `mcp.json` apunta al bin compilado con su path absoluto:

```json
{
  "mcpServers": {
    "dynamis": {
      "command": "node",
      "args": ["C:/ruta/absoluta/al/Dynamis-mcp/dist/index.js"]
    }
  }
}
```

Esta forma evita `npx` por completo y es 100% reproducible. Para actualizar la doctrina, `git pull && npm run build`.

### Recursos expuestos (5)

| URI | Qué devuelve |
|---|---|
| `dynamis://indice` | Índice maestro (66 fichas, 16 clusters) |
| `dynamis://ficha/{modulo}/{nombre}` | Ficha individual de un experto |
| `dynamis://sintesis/{cluster}` | Síntesis cross-experto (A, C, D, E, F, G, H, I) |
| `dynamis://skill/{nombre}` | Skill operativo (8 disponibles) |
| `dynamis://tensiones` | 6 tensiones transversales |

### Tools (7)

- `buscar_doctrina(query, experto?, cluster?)` — busca en fichas y síntesis (insensible a acentos).
- `validar_atribucion(experto, cluster)` — anti-fantasma: verifica EXPERTOS FUENTE antes de citar.
- `que_skill_aplica(problema)` — meta-índice problema → skill + cluster.
- `auditar_cluster(cluster)` — separa ★ consenso de ◇ una voz.
- `get_benchmark(cluster?, metrica?)` — benchmarks, preserva `[¿?]`.
- `sesgo_cluster(cluster)` — % Vinícius + lectura de confianza.
- `listar_huecos(cluster?)` — huecos conocidos + fuente externa asignada.

La referencia completa de tools y resources está en el código (`src/index.ts`).

### Usar doctrina propia (path custom)

```json
{
  "mcpServers": {
    "dynamis": {
      "command": "npx",
      "args": ["-y", "github:Santiagociroc11/Dynamis-mcp"],
      "env": { "DYNAMIS_PATH": "/ruta/a/data" }
    }
  }
}
```

`DYNAMIS_PATH` apunta a una carpeta con `fichas/`, `sintesis/`, `skills/` e `indice_maestro.md`.

---

## Doctrina transferible (para Cursor)

### Qué contiene

```
CEREBRO/
├── sintetizador.md              Plantilla: ficha individual
├── sintetizadorTOTAL.md         Plantilla: síntesis cross-experto
├── TRANSFERENCIA.md             Cómo transferir / instalar
├── OPERADOR.template.md         Plantilla de contexto personal (cada uno copia y completa)
├── empaquetar-dynamis.ps1       Script para regenerar zip one-shot
└── DYNAMIS/
    ├── indice_maestro.md        Mapa de fichas y clusters
    ├── fichas/                  Doctrina cruda por experto (66 fichas)
    └── sintesis/                Modelos integrados por cluster (A, C, D, E, F, G, H, I)

.cursor/skills/
├── dynamis-index/               Meta-índice: qué skill invocar
├── estructura-lanzamiento-cierre/   Cluster A
├── whatsapp-grupos-cierre/          Cluster C
├── oferta-anclaje-backend/          Cluster F
├── equipo-comercial-closers/        Cluster E
├── ecosistema-escalera-valor/       Cluster G
├── agencia-equipos-contratacion/    Cluster H
└── operacion-agil-delegacion/       Cluster I
```

> D (tráfico/creativos) no tiene skill propio: es insumo para los skills de ads del operador.

### Instalación en otro proyecto Cursor

1. Clonar o descargar este repo.
2. Copiar `CEREBRO/` al nuevo workspace.
3. Copiar `.cursor/skills/` (o las subcarpetas que apliquen).
4. Copiar `CEREBRO/OPERADOR.template.md` → `CEREBRO/OPERADOR.md` y completar el perfil (ticket, canal, mercado, defaults, doctrina propia).
5. En el chat de Cursor, invocar `@dynamis-index` cuando no sepas qué skill usar.
6. Opcional — agregar a las reglas del proyecto: *"Si existe `CEREBRO/OPERADOR.md`, leelo antes de aplicar skills DYNAMIS."*

### Cómo se usa (en el chat de Cursor)

```
¿No sé por dónde empezar?  →  @dynamis-index
Armar un launch            →  @estructura-lanzamiento-cierre
Cerrar por WhatsApp        →  @whatsapp-grupos-cierre
Diseñar oferta / anclaje   →  @oferta-anclaje-backend
Montar closers / HT        →  @equipo-comercial-closers
Pasar de picos a recurrencia → @ecosistema-escalera-valor
Estructurar agencia        →  @agencia-equipos-contratacion
Delegar / procesos         →  @operacion-agil-delegacion
```

## Reglas de calidad del sistema

- **★** = consenso real (2+ voces independientes) → doctrina confiable.
- **◇** = una voz → hipótesis fuerte, no ley.
- `[¿?]` nunca se elimina de benchmarks (verificar antes de proyectar caja).
- **Anti-fantasma:** no citar expertos fuera de EXPERTOS FUENTE de cada síntesis.
- Sesgo Vinícius calculado por cluster (ver `dynamis-index`).
- Tensiones cierran con CONDICIÓN DE DECISIÓN; el default personal va en `OPERADOR.md`.

## Loop de RESULTADOS PROPIOS

Tras cada launch (15 min), agregar en `OPERADOR.md` o en el skill usado:

```
- [fecha] Decisión aplicada: ...
  Benchmark DYNAMIS: ...
  Número real: ...
  Veredicto: confirma / contradice / matiza. Ajuste: ...
```

A los 3-4 launches, los números del operador pesan más que los de la mentoría.

## Pipeline para regenerar desde otro corpus

1. **Fichas** — por cada transcripción, correr `sintetizador.md` → `CEREBRO/DYNAMIS/fichas/moduloN/`.
2. **Índice maestro** — agrupar fichas en clusters → `indice_maestro.md`.
3. **Síntesis** — por cluster, correr `sintetizadorTOTAL.md` → `sintesis/`.
4. **Skills** — convertir cada síntesis: ARSENAL OPERATIVO + MAPA DE TENSIONES → cuerpo del skill; CONDICIÓN DE DECISIÓN → lógica.
5. **Meta-skill** — `dynamis-index/SKILL.md` mapea skills, tensiones transversales y huecos.
6. **Operador** — cada usuario completa `OPERADOR.md` y agrega RESULTADOS PROPIOS tras cada launch.

## Desarrollo del MCP

```bash
npm install        # instala deps + corre postinstall (build: copy-data + tsc)
npm run build      # regenera dist/ y data/ manualmente
npm start          # arranca el servidor stdio
```

Estructura del paquete:

```
package.json       bin: dynamis-mcp -> dist/index.js
src/index.ts       código fuente del MCP server
scripts/copy-data.mjs   copia CEREBRO/DYNAMIS + .cursor/skills -> data/
tsconfig.json
dist/              compilado (generado por build, en .gitignore)
data/              doctrina copiada (generada por build, en .gitignore)
```

## Contribuir

Si mejorás la doctrina base (nuevas fichas, síntesis, correcciones de sesgo):
1. Rama nueva.
2. Commit con descripción del cambio y la fuente (qué ficha/experto).
3. PR — respetá las reglas de calidad (★/◇, `[¿?]`, anti-fantasma, sin contexto personal).

**No commitear** `CEREBRO/OPERADOR.md` ni datos de launches reales (están en `.gitignore`).

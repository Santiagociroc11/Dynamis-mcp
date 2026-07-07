# dynamis-mcp

MCP server del sistema de doctrina **DYNAMIS** (lanzamientos y ventas de infoproductos). Funciona en cualquier cliente MCP: Cursor, Claude Desktop, Windsurf, Continue, Cline, etc.

Expone las **66 fichas de expertos**, **8 síntesis cross-experto** y **8 skills** como resources, más **7 tools** de doctrina con las reglas de calidad del sistema automatizadas.

## Instalación

### Cursor — editar `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "dynamis": { "command": "npx", "args": ["-y", "dynamis-mcp"] }
  }
}
```

### Claude Desktop — editar `claude_desktop_config.json`

```json
{
  "mcpServers": {
    "dynamis": { "command": "npx", "args": ["-y", "dynamis-mcp"] }
  }
}
```

### Otros clientes MCP

Cualquier cliente que soporte MCP sobre stdio. Mismo comando: `npx -y dynamis-mcp`.

## Recursos expuestos (5)

| URI | Qué devuelve |
|---|---|
| `dynamis://indice` | Índice maestro (mapa de 66 fichas y 16 clusters) |
| `dynamis://ficha/{modulo}/{nombre}` | Ficha individual de un experto (66 disponibles) |
| `dynamis://sintesis/{cluster}` | Síntesis cross-experto de un cluster (A, C, D, E, F, G, H, I) |
| `dynamis://skill/{nombre}` | Skill operativo de Cursor (8 disponibles) |
| `dynamis://tensiones` | Las 6 tensiones transversales que cruzan clusters |

## Tools (7)

### `buscar_doctrina(query, experto?, cluster?)`

Busca en las 66 fichas y 8 síntesis por palabra clave (insensible a acentos y mayúsculas). Filtra por experto o cluster. Devuelve pasajes ordenados por relevancia con atribución.

### `validar_atribucion(experto, cluster)` — anti-fantasma

Verifica si un experto está en EXPERTOS FUENTE de un cluster antes de citarlo. Regla de calidad DYNAMIS automatizada: evita citar expertos fuera de su cluster.

### `que_skill_aplica(problema)`

Meta-índice: dado un problema, devuelve qué skill invocar y el cluster fuente. Úsalo PRIMERO cuando no sepas qué skill aplica.

### `auditar_cluster(cluster)`

Devuelve el checklist de auditoría de un cluster separado en **★ consenso real** (van primero) y **◇ una voz** (upside táctico, después). Regla: ante recursos limitados, primero cerrar todos los ★.

### `get_benchmark(cluster?, metrica?)`

Devuelve los benchmarks de un cluster (o de todos). **Preserva los marcadores `[¿?]`** que indican números heredados de transcripciones sucias — verificar antes de proyectar caja. Filtra opcionalmente por métrica (insensible a acentos).

### `sesgo_cluster(cluster)`

Devuelve el sesgo Vinícius del cluster (% de fichas suyas) y la lectura de confianza. Regla: cuanto más alto el %, más tratar los ★ como hipótesis fuerte de un arquitecto y menos como verdad del campo. En G/H/I contrastar con fuentes externas antes de adoptar como ley.

### `listar_huecos(cluster?)`

Lista los huecos conocidos de un cluster: lo que DYNAMIS NO cubre y la fuente externa asignada. Úsalo antes de buscar doctrina fuera del corpus y para saber qué documentar en `OPERADOR.md`.

## Usar doctrina propia (path custom)

El servidor carga la doctrina desde el paquete por defecto. Para apuntar a tu propio `CEREBRO/DYNAMIS/` + `.cursor/skills/`:

```json
{
  "mcpServers": {
    "dynamis": {
      "command": "npx",
      "args": ["-y", "dynamis-mcp"],
      "env": { "DYNAMIS_PATH": "/ruta/a/data" }
    }
  }
}
```

`DYNAMIS_PATH` debe apuntar a una carpeta con `fichas/`, `sintesis/`, `skills/` e `indice_maestro.md`.

## Reglas de calidad del sistema

- **★** = consenso real (2+ voces independientes) → doctrina confiable.
- **◇** = una voz → hipótesis fuerte, no ley.
- `[¿?]` nunca se elimina de benchmarks (verificar antes de proyectar caja).
- **Anti-fantasma:** no citar expertos fuera de EXPERTOS FUENTE de cada síntesis (validar con `validar_atribucion`).
- Sesgo Vinícius calculado por cluster (consultar con `sesgo_cluster`).

## Contexto del operador

El MCP no carga `OPERADOR.md` (es contexto personal, no transferible). Cada operador lo completa aparte. Las tools resuelven con CONDICIÓN DE DECISIÓN; el default personal vive en `OPERADOR.md`.

## Desarrollo

```bash
cd mcp
npm install
npm run build        # copia data/ (fichas + sintesis + skills) + compila TS
npm start            # arranca el servidor stdio
```

Publicar a npm:

```bash
npm publish          # ejecuta prepublishOnly (build) automáticamente
```

## Estructura del paquete

```
dynamis-mcp/
├── dist/            compilado (regenerado por build)
├── data/            doctrina (regenerada por build desde CEREBRO/DYNAMIS + .cursor/skills)
│   ├── fichas/      66 fichas
│   ├── sintesis/    8 síntesis
│   ├── skills/      8 skills
│   └── indice_maestro.md
├── src/index.ts     código fuente
└── package.json
```

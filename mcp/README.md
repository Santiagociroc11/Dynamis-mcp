# dynamis-mcp

MCP server del sistema de doctrina **DYNAMIS** (lanzamientos y ventas de infoproductos). Funciona en cualquier cliente MCP: Cursor, Claude Desktop, Windsurf, Continue, Cline, etc.

Expone las 66 fichas de expertos y 8 síntesis cross-experto como **resources**, más 3 **tools** de doctrina.

## Instalación

### Cursor

Editar `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "dynamis": {
      "command": "npx",
      "args": ["-y", "dynamis-mcp"]
    }
  }
}
```

### Claude Desktop

Editar `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "dynamis": {
      "command": "npx",
      "args": ["-y", "dynamis-mcp"]
    }
  }
}
```

### Otros clientes MCP

Cualquier cliente que soporte MCP sobre stdio. Mismo comando: `npx -y dynamis-mcp`.

## Recursos expuestos

| URI | Qué devuelve |
|---|---|
| `dynamis://indice` | Índice maestro (mapa de 66 fichas y 16 clusters) |
| `dynamis://ficha/{modulo}/{nombre}` | Ficha individual de un experto |
| `dynamis://sintesis/{cluster}` | Síntesis cross-experto de un cluster (A, C, D, E, F, G, H, I) |

## Tools

### `buscar_doctrina(query, experto?, cluster?)`

Busca en las 66 fichas y 8 síntesis por palabra clave. Filtra por experto o cluster. Devuelve pasajes con atribución.

### `validar_atribucion(experto, cluster)` — anti-fantasma

Verifica si un experto está en EXPERTOS FUENTE de un cluster antes de citarlo. Regla de calidad de DYNAMIS automatizada.

### `que_skill_aplica(problema)`

Meta-índice: dado un problema, devuelve qué skill invocar y el cluster fuente. Úsalo PRIMERO cuando no sepas qué skill aplica.

## Usar doctrina propia (path custom)

El servidor carga la doctrina desde el paquete por defecto. Para apuntar a tu propio `CEREBRO/DYNAMIS/`:

```json
{
  "mcpServers": {
    "dynamis": {
      "command": "npx",
      "args": ["-y", "dynamis-mcp"],
      "env": { "DYNAMIS_PATH": "/ruta/a/tu/CEREBRO/DYNAMIS" }
    }
  }
}
```

## Reglas de calidad del sistema

- **★** = consenso real (2+ voces independientes) → doctrina confiable.
- **◇** = una voz → hipótesis fuerte, no ley.
- `[¿?]` nunca se elimina de benchmarks (verificar antes de proyectar caja).
- **Anti-fantasma:** no citar expertos fuera de EXPERTOS FUENTE de cada síntesis (validar con `validar_atribucion`).
- Sesgo Vinícius calculado por cluster.

## Contexto del operador

El MCP no carga `OPERADOR.md` (es contexto personal, no transferible). Cada operador lo completa aparte. Las tools resuelven con CONDICIÓN DE DECISIÓN; el default personal vive en `OPERADOR.md`.

## Desarrollo

```bash
cd mcp
npm install
npm run build        # copia data/ + compila TS
npm start            # arranca el servidor stdio
```

Publicar a npm:

```bash
npm publish          # ejecuta prepublishOnly (build) automáticamente
```

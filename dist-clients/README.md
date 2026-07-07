# DYNAMIS — Paquetes para clientes sin MCP

Para usar las **skills** de DYNAMIS en clientes que **no soportan MCP stdio local** (Claude web, ChatGPT web, Gemini web), se replica la doctrina con **knowledge + instrucciones**. Estos paquetes ya traen todo listo para subir.

> Las skills de Cursor son instrucciones operativas (texto). En Claude web se replican con un **Project**, en ChatGPT con un **Custom GPT**. No requieren instalar Node ni MCP.

## Paquetes

| Paquete | Para | Cómo | Archivos |
|---|---|---|---|
| `dynamis-claude-project.zip` | claude.ai (web/desktop) | Project + Knowledge | 8 skills + 8 síntesis + indice |
| `dynamis-chatgpt-gpt.zip` | ChatGPT (Custom GPT) | Custom GPT + Knowledge | 8 skills + 8 síntesis + indice |
| `dynamis-gemini-gem.zip` | Gemini (Gem) | Gem + Knowledge (máx 10) | skills-todas.md + sintesis-todas.md + indice (consolidado) |

Cada zip contiene:
- `INSTRUCCIONES.md` — qué pegar en las instrucciones + qué subir al knowledge.
- Las skills y síntesis (en carpetas para Claude/ChatGPT; consolidadas en un archivo cada una para Gemini, por su límite de 10 archivos).
- `indice_maestro.md` — mapa de las 66 fichas y 16 clusters.

## Generar los zips

```powershell
# desde la raiz del repo
powershell -ExecutionPolicy Bypass -File dist-clients\empaquetar-clients.ps1
```

Genera `dist-clients/dynamis-claude-project.zip` y `dist-clients/dynamis-chatgpt-gpt.zip`.

## Uso rápido

### Claude Project
1. claude.ai → Projects → Create project.
2. Pega el bloque de `claude-project/INSTRUCCIONES.md` en **Project instructions**.
3. Sube `skills/`, `sintesis/`, `indice_maestro.md` a **Project content**.
4. (Privado) sube también tu `OPERADOR.md`.

### Custom GPT (ChatGPT)
1. chatgpt.com → Explore GPTs → Create.
2. Pega el bloque de `chatgpt-gpt/INSTRUCCIONES.md` en **Instructions**.
3. Sube `skills/`, `sintesis/`, `indice_maestro.md` a **Knowledge**.
4. (Privado) sube también tu `OPERADOR.md`.

### Gemini Gem
1. gemini.google.com → Gem manager → New Gem.
2. Pega el bloque de `gemini-gem/INSTRUCCIONES.md` en **Instructions** (la primera línea fuerza el uso del knowledge).
3. Sube SOLO `skills-todas.md`, `sintesis-todas.md`, `indice_maestro.md` a **Knowledge** (Gemini máx 10 archivos, por eso se consolida).
4. (Privado) sube también tu `OPERADOR.md`.

## Importante

- **No subas `OPERADOR.md`** a un project/GPT público. Es contexto personal del operador. Solo al tuyo privado.
- Estos paquetes replican las **skills** (instrucciones). Los **tools dinámicos** del MCP (`buscar_doctrina`, `validar_atribucion`, etc.) requieren el MCP remote + Connectors (plan pago en Claude/ChatGPT). Para la mayoría de uso, las skills con knowledge bastan.
- Para Cursor, Claude Desktop, ChatGPT Desktop y Gemini CLI, mejor usar el **MCP** (`npx -y github:Santiagociroc11/Dynamis-mcp`) — ver el README principal.

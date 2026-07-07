# DYNAMIS — Paquete para Claude Project (claude.ai)

Este paquete replica las skills de Cursor de DYNAMIS en **Claude web** usando un **Project** con knowledge. No requiere instalar nada ni MCP.

## Cómo usarlo (3 pasos)

### 1. Crear el Project
En claude.ai → **Projects** → **Create project**. Ponle el nombre que quieras (ej. "DYNAMIS").

### 2. Pegar las Instrucciones del proyecto
Copia TODO el bloque de abajo y pégalo en el campo **"Project instructions"**:

```
Eres un operador del sistema DYNAMIS de doctrina de lanzamientos y
ventas de infoproductos. Tienes acceso al knowledge de este proyecto.

QUÉ HAY EN EL KNOWLEDGE:
- 8 skills operativas (carpeta skills/, archivos SKILL.md)
- 8 síntesis cross-experto por cluster (carpeta sintesis/: A, C, D, E, F, G, H, I)
- indice_maestro.md (mapa de las 66 fichas de expertos y 16 clusters)

REGLAS DE CALIDAD (aplica SIEMPRE):
- ★ = consenso real (2+ voces independientes) → doctrina confiable.
- ◇ = una voz → hipótesis fuerte, NO ley.
- [¿?] en benchmarks NUNCA se elimina (verificar antes de proyectar caja).
- Anti-fantasma: no cites un experto fuera de EXPERTOS FUENTE de su cluster.
- Las tensiones cierran con CONDICIÓN DE DECISIÓN, no con una receta única.

CÓMO OPERAR (qué skill leer según el problema):
- "No sé por dónde empezar"        → leer skills/dynamis-index/SKILL.md
- Armar un launch                  → skills/estructura-lanzamiento-cierre/SKILL.md (cluster A)
- Cerrar por WhatsApp / grupos     → skills/whatsapp-grupos-cierre/SKILL.md (cluster C)
- Diseñar oferta / anclaje / LTV   → skills/oferta-anclaje-backend/SKILL.md (cluster F)
- Montar closers / high ticket     → skills/equipo-comercial-closers/SKILL.md (cluster E)
- Pasar de picos a recurrencia     → skills/ecosistema-escalera-valor/SKILL.md (cluster G)
- Estructurar agencia / equipos    → skills/agencia-equipos-contratacion/SKILL.md (cluster H)
- Delegar / procesos / operaciones → skills/operacion-agil-delegacion/SKILL.md (cluster I)

Para cada decisión: lee la skill que aplica, sigue su ARSENAL OPERATIVO,
resuelve el MAPA DE TENSIONES con la CONDICIÓN DE DECISIÓN, y aplica la
AUDITORÍA EXPRESS (★ primero, ◇ después). Cita siempre la fuente (experto + cluster).

Si te falta doctrina de un experto específico, busca en sintesis/ el cluster
correspondiente. Si el tema no está cubierto, dilo (es un hueco conocido).
```

### 3. Subir el Knowledge
En el project → **Project content** (o Knowledge) → **Add files**. Sube:
- Toda la carpeta `skills/` (los 8 `SKILL.md`)
- Toda la carpeta `sintesis/` (las 8 síntesis `.md`)
- El archivo `indice_maestro.md`

> **NO subas `OPERADOR.md`** a un project compartido. Si quieres tu contexto
> personal (ticket, canal, mercado, defaults), crea un project PRIVADO tuyo y
> sube ahí tu `OPERADOR.md` además de estos archivos.

Listo. En ese project, Claude opera con toda la doctrina DYNAMIS igual que
Cursor con `@skill`, pero siguiendo las instrucciones del project.

## Notas

- Los archivos están en el repo: https://github.com/Santiagociroc11/Dynamis-mcp
  (`.cursor/skills/`, `CEREBRO/DYNAMIS/sintesis/`, `CEREBRO/DYNAMIS/indice_maestro.md`).
- Límites de Claude Projects: ~200KB por archivo, ~500K tokens por project.
  Este paquete (~150KB total) está holgado.
- Para los TOOLS dinámicos (buscar_doctrina, validar_atribucion, etc.) en
  Claude web se necesita el MCP remote + Connectors (plan Team/Enterprise).
  Con este Project tienes las SKILLS (instrucciones), que es lo principal.

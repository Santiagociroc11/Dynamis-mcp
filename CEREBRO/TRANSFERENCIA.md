# Cómo transferir el sistema DYNAMIS a otra persona o proyecto

Este paquete es **portable por diseño**: la doctrina de los expertos vive separada del contexto del operador.

## Qué copiar (el paquete transferible)

```
CEREBRO/
├── sintetizador.md              # Plantilla: ficha individual
├── sintetizadorTOTAL.md         # Plantilla: síntesis cross-experto
├── TRANSFERENCIA.md             # Este archivo
├── OPERADOR.template.md         # Plantilla de contexto personal (copiar y renombrar)
└── DYNAMIS/
    ├── indice_maestro.md        # Mapa de fichas y clusters
    ├── fichas/                  # Doctrina cruda por experto (66 fichas)
    └── sintesis/                # Modelos integrados por cluster (A, C, D…)

.cursor/skills/
├── dynamis-index/               # Meta-índice: qué skill invocar
├── estructura-lanzamiento-cierre/
├── whatsapp-grupos-cierre/
├── oferta-anclaje-backend/
├── equipo-comercial-closers/
├── ecosistema-escalera-valor/
├── agencia-equipos-contratacion/
└── operacion-agil-delegacion/
```

**No copiar** (es contexto local del operador original):
- `CEREBRO/OPERADOR.md` (si existe) — perfil, ticket, canal, mercado, stack propio
- Secciones `## RESULTADOS PROPIOS` dentro de skills (datos de launches reales)
- Cualquier nota personal en Notion/transcripts del operador

## Instalación en otro proyecto Cursor

1. Copiar la carpeta `CEREBRO/` completa al nuevo workspace.
2. Copiar `.cursor/skills/` (o solo las subcarpetas `dynamis-*` y las de clusters).
3. Crear `CEREBRO/OPERADOR.md` desde `OPERADOR.template.md` y completar el perfil del nuevo operador.
4. Invocar `@dynamis-index` cuando no sepas qué skill usar.
5. Opcional: agregar en las reglas del proyecto: *"Si existe CEREBRO/OPERADOR.md, leelo antes de aplicar skills DYNAMIS."*

## Dónde va el contexto personal (y dónde NO)

| Tipo de contenido | Dónde vive | Transferible |
|---|---|---|
| Doctrina de expertos (fichas) | `CEREBRO/DYNAMIS/fichas/` | Sí |
| Síntesis cross-experto | `CEREBRO/DYNAMIS/sintesis/` | Sí |
| Skills operativos | `.cursor/skills/` | Sí |
| Perfil del operador (ticket, canal, mercado) | `CEREBRO/OPERADOR.md` | No (cada uno el suyo) |
| Data post-launch | `## RESULTADOS PROPIOS` en skills | No |
| Huecos con doctrina externa propia | `OPERADOR.md` → sección Doctrina propia | No |

Las síntesis y skills **no deben** contener "tu launch", "tu core low ticket", "CashinBot", etc. Eso va en `OPERADOR.md`.

## Pipeline para generar el sistema desde cero (otro corpus)

1. **Fichas** — Por cada transcripción, correr `sintetizador.md` → `CEREBRO/DYNAMIS/fichas/moduloN/`.
2. **Índice maestro** — Agrupar fichas en clusters → `indice_maestro.md`.
3. **Síntesis** — Por cluster, correr `sintetizadorTOTAL.md` → `sintesis/`.
4. **Skills** — Convertir cada síntesis: `ARSENAL OPERATIVO` + `MAPA DE TENSIONES` → cuerpo del skill; `CONDICIÓN DE DECISIÓN` → lógica.
5. **Meta-skill** — `dynamis-index/SKILL.md` mapea skills, tensiones transversales y huecos.
6. **Operador** — Cada usuario completa `OPERADOR.md` y va agregando `RESULTADOS PROPIOS` tras cada launch.

## Reglas de calidad al transferir

- ★ = consenso real (2+ voces independientes); ◇ = una voz.
- `[¿?]` nunca se elimina de benchmarks.
- Anti-fantasma: no citar expertos fuera de EXPERTOS FUENTE.
- Sesgo Vinícius calculado **por cluster**, no por corpus total.
- Sin contexto personal embebido en síntesis/skills.

## Actualizar skills de ads existentes (cluster D)

`D_trafico_creativos.md` es **insumo**, no skill nuevo. Al transferir, fusionar su contenido en los skills de ads que ya tenga el operador (no duplicar).

## Empaquetar para compartir (Windows)

Desde la raíz del proyecto:

```powershell
.\CEREBRO\empaquetar-dynamis.ps1
```

Genera `DYNAMIS-transferible.zip` con `CEREBRO/` (sin `OPERADOR.md`) + `.cursor/skills/` de clusters DYNAMIS.

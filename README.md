# DYNAMIS — Sistema de doctrina de lanzamientos y ventas

Sistema portable de doctrina operativa para infoproductos, construido a partir de 66 fichas de expertos agrupadas en 8 clusters (A, C, D, E, F, G, H, I). Incluye síntesis cross-experto, skills para Cursor y un meta-índice.

La doctrina de los expertos vive **separada del contexto del operador**. Cada usuario completa su propio `CEREBRO/OPERADOR.md` (no se commitea).

## Qué contiene

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

## Instalación en otro proyecto Cursor

1. Clonar o descargar este repo.
2. Copiar `CEREBRO/` al nuevo workspace.
3. Copiar `.cursor/skills/` (o las subcarpetas que apliquen).
4. Copiar `CEREBRO/OPERADOR.template.md` → `CEREBRO/OPERADOR.md` y completar el perfil (ticket, canal, mercado, defaults, doctrina propia).
5. En el chat de Cursor, invocar `@dynamis-index` cuando no sepas qué skill usar.
6. Opcional — agregar a las reglas del proyecto: *"Si existe `CEREBRO/OPERADOR.md`, leelo antes de aplicar skills DYNAMIS."*

## Cómo se usa (en el chat de Cursor)

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

## Contribuir

Si mejorás la doctrina base (nuevas fichas, síntesis, correcciones de sesgo):
1. Rama nueva.
2. Commit con descripción del cambio y la fuente (qué ficha/experto).
3. PR — respetá las reglas de calidad (★/◇, `[¿?]`, anti-fantasma, sin contexto personal).

**No commitear** `CEREBRO/OPERADOR.md` ni datos de launches reales (están en `.gitignore`).

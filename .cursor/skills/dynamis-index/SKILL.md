---
name: dynamis-index
description: >-
  Meta-índice del sistema de doctrina DYNAMIS. Mapea qué skill invocar para cada
  problema (lanzamiento, WhatsApp, oferta, closers, ecosistema, tráfico, agencia,
  operación), las tensiones transversales que cruzan clusters (low vs high ticket,
  automatización vs humano, volumen vs calificación), el sesgo Vinícius por
  cluster, los huecos conocidos con su fuente externa asignada, y el loop de
  RESULTADOS PROPIOS. Úsala PRIMERO cuando no sepas qué skill aplica, cuando un
  problema cruce varios clusters, o para versionar la doctrina del operador con data real.
disable-model-invocation: true
---

# DYNAMIS — Meta-índice de Doctrina

Este es el mapa del sistema. Cuando tengas un problema y no sepas qué skill invocar, empezá acá. Fuente: síntesis en `CEREBRO/DYNAMIS/sintesis/` + índice maestro en `CEREBRO/DYNAMIS/indice_maestro.md`.

## Regla madre del sistema

Toda afirmación es atribuible a un experto. **★ CONSENSO REAL** (2+ voces independientes) = doctrina confiable del campo. **◇ UNA VOZ** = hipótesis fuerte, no ley. Ante recursos limitados, **primero los ★**. Prohibido citar expertos fuera de EXPERTOS FUENTE de cada síntesis (anti-fantasma).

---

## Qué skill invocar para cada problema

| Si el problema es... | Invocá | Cluster | Fuente |
|---|---|---|---|
| Armar/correr un lanzamiento, cierre de carrito, escasez, evento | `estructura-lanzamiento-cierre` | A | `sintesis/A_...` |
| Cerrar/recuperar por WhatsApp, grupos, manada, anti-baneo | `whatsapp-grupos-cierre` | C | `sintesis/C_...` |
| Diseñar oferta, anclar precio, escalera, backend, LTV, combo | `oferta-anclaje-backend` | F | `sintesis/F_...` |
| Montar equipo de ventas, closers, lista de espera, ascender a HT | `equipo-comercial-closers` | E | `sintesis/E_...` |
| Pasar de picos a recurrencia, membresía, ecosistema, downsell/upsell | `ecosistema-escalera-valor` | G | `sintesis/G_...` |
| Tráfico/creativos/testeo/quiz/escala de pauta | `ads-infoproductos` + `creativos-imagen-brunson` (actualizados con insumo D) | D | `sintesis/D_...` |
| Estructurar equipo/organigrama, contratación, nómina, formación | `agencia-equipos-contratacion` | H | `sintesis/H_...` |
| Delegar, procesos, sprint, planificación anual, caos operativo | `operacion-agil-delegacion` | I | `sintesis/I_...` |

> D NO tiene skill propio: es insumo para actualizar los skills de ads del operador (no dupliques).

---

## Sesgo Vinícius por cluster (leé esto antes de confiar en un ★)

Vinícius Loureiro es el mentor dominante del corpus. Su sobre-representación varía por cluster — y cambia cuánto podés confiar en los "consensos":

| Cluster | % fichas Vinícius | Lectura de confianza |
|---|---|---|
| F (oferta) | ~17% (1/6) | **Más confiable.** Consensos reales de 6 operadores. |
| D (tráfico) | ~33% (2/6) | **Muy confiable.** 4 voces independientes densas. |
| E (comercial) | ~43% (3/7) | Confiable. Dominante pero con 4 independientes. |
| A (lanzamiento) | (ver síntesis A) | Dominante; consensos verificados. |
| C (WhatsApp) | 0% (Vinícius ausente) | Sesgo distinto: la voz sobre-representada es **Daniel Marcovich**. |
| G (ecosistema) | ~67% (4/6) | **Cuidado.** Toda la arquitectura es doctrina de una voz. |
| H (agencia) | ~86% (6/7) | **Alerta.** Es el modelo de UNA agencia, no consenso. |
| I (operación) | ~86% (6/7) | **Alerta doble.** El "segundo experto" (Flávio) es el COO de Vinícius: cero validación externa. |

**Regla:** cuanto más alto el %, más tratás los ★ como "hipótesis fuerte de un arquitecto" y menos como "verdad del campo". En G/H/I, contrastá con fuentes externas antes de adoptar como ley.

---

## Tensiones transversales (cruzan clusters — son las decisiones madre)

### 1. LOW TICKET vs. HIGH TICKET — LA tensión madre (aparece en A, E, F, G, I)
- Low ticket → manada, automatización, volumen, front-end (A, C, F).
- High ticket → closer 1-a-1, calificación, anclaje, backend (E, F).
- **Resolución:** cruzar umbral de ticket y canal de cierre con el perfil en `OPERADOR.md`. Típicamente: automatización abajo, humano arriba — sin mezclar las máquinas.

### 2. AUTOMATIZACIÓN vs. HUMANO (A, C, E)
- Umbral ~$300 de ticket + complejidad de objeción.
- **Resolución:** automatización para lo repetible; humano donde la objeción o el ticket lo justifiquen (última hora del carrito, downsell/upsell caro).

### 3. VOLUMEN barato vs. CALIFICACIÓN (C, D, E)
- Volumen si el cierre es por manada; calificación si hay closer.
- **Resolución:** volumen barato + capa mínima de segmentación por copy/quiz para no llenar grupos de curiosos.

### 4. PICOS de lanzamiento vs. PREVISIBILIDAD de recurrencia (G, F, H, I)
- **Resolución:** si la caja depende de picos, priorizar piso recurrente que cubra costos fijos; los launches quedan como upside.

### 5. VITALICIO vs. RECURRENCIA (F, G)
- **Resolución:** vitalicio solo en productos maduros; la recurrencia es el activo a construir.

### 6. NÓMINA formal vs. MIXTO freelancers (H, I)
- **Resolución:** mixto en validación; nómina formal cuando la recurrencia cubra costos fijos.

---

## Huecos conocidos → fuente externa asignada

Lo que DYNAMIS NO cubre y de dónde sacarlo:

| Hueco | Cluster | Fuente asignada |
|---|---|---|
| Anti-baneo de INFRAESTRUCTURA (proxies, chips, ratios IP) | C | **doctrina externa del operador** (documentada en `whatsapp-grupos-cierre`; sirve para stack propio del operador) |
| Email como sistema (nurturing/recurrencia) | C, G | Doctrina externa (Kennedy / Schwartz) |
| Retención/churn con métricas y playbook | G, M | Doctrina externa (doctrina externa; M no se sintetiza) |
| Recurrencia low ticket por canal de mensajería (ej. WhatsApp P2P) | G | **Hueco sin cobertura DYNAMIS** — doctrina externa del operador |
| Pricing research (fijar precio base, no solo anclar) | F | Externa |
| Google/YouTube Ads como sistema | D | Externa |
| Libreto de objeciones por objeción | E | Externa / experiencia del operador |
| Operación para equipo de 1-3 personas | I | **Adaptación del operador** a partir de la versión mínima viable |
| Validación cross-experto del modelo de agencia | H, I | Externa (86% una voz; contrastar) |

---

## Clusters que NO se sintetizan (decisión deliberada)

- **M (retención), N, P:** 3 fichas o menos — no dan para cross-experto; sintetizar sería disfrazar una voz de "síntesis". M (retención) se resuelve con doctrina externa cuando toque. B/J/K/L/O: solo si aparece el dolor, no por completismo.

---

## RESULTADOS PROPIOS — el loop que convierte esto en doctrina verificada

Después de cada launch, 15 minutos: agregá en `CEREBRO/OPERADOR.md` (sección RESULTADOS PROPIOS) o en el skill usado:

```
## RESULTADOS PROPIOS
- [fecha] Corrí [decisión concreta].
  Benchmark DYNAMIS decía [ej. "conversión manada 6-8%"]. Número real: [X%].
  Veredicto: [confirma / contradice / matiza el benchmark]. Ajuste: [...].
```

Tras 3-4 launches, los números del operador empiezan a pesar más que los de la mentoría, y las DECISIONES ABIERTAS se cierran con data real. Ahí DYNAMIS pasa de ser referencia externa al punto de partida de una doctrina versionada contra caja real.

**Control de calidad por síntesis (4 checks de 5 min):** ¿fantasmas en atribuciones? · ¿sobrevivieron los `[¿?]`? · ¿tensiones con condición o "depende" vacío? · ¿checklist marcado ★/◇?

---

## Estado del sistema

- **Skills operativos (7):** A, C, E, F, G, H, I. + D como insumo para skills de ads del operador.
- **Síntesis completas (8 docs):** `CEREBRO/DYNAMIS/sintesis/{A,C,D,E,F,G,H,I}_*.md`.
- **Índice maestro de fichas:** `CEREBRO/DYNAMIS/indice_maestro.md` (66 fichas, 16 clusters).
- **Reglas fijas del sintetizador:** `CEREBRO/sintetizadorTOTAL.md`.

---
name: whatsapp-grupos-cierre
description: >-
  Diseña y audita el cierre de ventas por WhatsApp para infoproductos: arquitectura
  de capas (captación → ventana 24h → 1-a-1 → grupo → checkout → recuperación),
  efecto manada en grupos, cierre 1-a-1 con closers, recuperación de checkout
  automatizada, Lead Scoring, microsegmentación con UTMs y protección del número
  (app-layer + infraestructura). Doctrina integrada de 5 expertos DYNAMIS (André
  Machado, Daniel Marcovich, Jordi Segués, Cuadra Hermanos, Natan). Úsala cuando
  el usuario arme o corra un cierre por WhatsApp, decida grupo abierto vs. 1-a-1,
  gestione grupos, monte recuperación de carrito, o pregunte por baneo de
  números/chips. Infraestructura propia del operador va en `OPERADOR.md`.
disable-model-invocation: true
---

# Cierre de Ventas por WhatsApp y Grupos

Modelo integrado para vender por WhatsApp. Fuente: `CEREBRO/DYNAMIS/sintesis/C_whatsapp_grupos_chat.md`. Perfil del operador en `CEREBRO/OPERADOR.md`.

## Regla madre

Toda afirmación es atribuible. **★ CONSENSO REAL** (2+ expertos independientes) → doctrina confiable; **◇ UNA VOZ** (un experto) → hipótesis fuerte, no ley. Ante recursos limitados: **primero los ★**.

> Sesgo de este cluster: NO hay Vinícius. La voz sobre-representada es **Daniel Marcovich (2 de 6 fichas)**, que empuja "1-a-1 > grupo" — y contradice a André. No es consenso: es una tesis de operador.

## Modelo base

WhatsApp es la máquina de cierre completa (reemplaza al email en LATAM). Arquitectura por capas:

`Anuncio (con palabra clave) → ventana 24h consentida → 1-a-1 de calentamiento (o directo a grupo si low ticket) → Grupo (manada o broadcast) → Checkout → Recuperación automatizada`

---

## Lógica de decisión (MAPA DE TENSIONES)

| Decisión | Condición de decisión |
|---|---|
| **Grupo abierto (manada) vs. mudo + 1-a-1** | Manada si ticket bajo + volumen (venta emocional por imitación); 1-a-1 mudo si ticket medio/alto + closer |
| **Tamaño de grupo: ≤250 vs. 800** | El límite lo fija el MODO, no un número: conversación gestionada por humano → ≤250; broadcast + FOMO automatizado → hasta 800 |
| **Automatización vs. humano** | Automatizá lo repetible (recuperación, avisos, calificación); humano donde hay objeción o ticket que lo pague |
| **CPL bajo/volumen vs. calificación** | Volumen si low ticket por manada; calidad si closer/ticket medio-alto |
| **Ventana carrito: 10h / 12h / multi-día** | Ultra-corta (10-12h) maximiza FOMO con demanda calentada; multi-día si necesitás clase de consulta para indecisos |

---

## Arsenal operativo

### Anti-baneo APP-LAYER (Jordi + Natan + Daniel, ★)
- Forzá al lead a escribir una **palabra clave** ("MARÍA", "YOUTUBE") o tocar un **botón de texto** en el primer DM → abre la ventana de 24h consentida de Meta.
- Disparadores flexibles (con/sin tilde, errores) o perdés hasta 20% de leads.
- No abras comentarios libres en grupos de cierre si el ticket es medio/alto.

### Anti-baneo INFRAESTRUCTURA (doctrina externa — NO cubierto por DYNAMIS)
> ⚠️ COMPLETAR EN OPERADOR.md. El cluster DYNAMIS no cubre la capa de infraestructura. Documentar en `CEREBRO/OPERADOR.md` (sección Doctrina propia):
> - Proxies: proveedor (ej. Proxy-Cheap), tipo (móvil/residencial), rotación.
> - Ratio IP : número (objetivo 1:1).
> - Chips: origen, calentamiento previo, antigüedad mínima antes de operar.
> - Móviles custodios: cuántos números por dispositivo, cómo se aíslan.
> - Umbrales de envío por número/día antes de rotar.
> - Señales de pre-baneo y protocolo de reemplazo.

### Recuperación de checkout (Daniel + André, ★)
4 flujos automáticos (Hotmart+ManyChat): **cancelada** (video experto + enlace alt), **abandonado** (mín. 2 seguimientos), **boleto** (tutorial de pago en su moneda), **aprobada** (bienvenida inmediata). Complemento humano: audio del setter + audio del experto ("voy saliendo de la oficina...") en **<30 min** (pasado ese umbral se pierde 80%).

### Efecto manada en grupo (André + Cuadra, ★)
Apertura: *"¡Hola a todos! Escríbannos nombre, ciudad y qué quieren aprender..."*. En carrito: incentivar **"¡Yo compré!"** + compartir capturas + foto con countdown por hora + mover compradores al grupo VIP. Hispano: nunca "Carrito Cerrado" → "Inscripciones finalizadas".

### Lead Scoring + closers (Jordi, ◇)
Encuesta → score 0-100 → closers entran por privado a los >90 antes de abrir carrito.

### Microsegmentación/UTMs (Daniel, ◇)
UTM+datos en registro → calificadoras en WhatsApp → cruzar con conversión → escalar el anuncio del microsegmento ganador, apagar el de leads descalificados aunque tenga CPL bajo. Medir embudo 3×/día.

### Check-in orgánico IG (Natan, ◇)
Post 23h antes → comentario con palabra clave → DM con botón (ventana 24h) → boleto personalizado con foto (API open-source + Cloudflare Tunnel, separado del flujo por si falla).

---

## Lógica de priorización (AUDITORÍA EXPRESS)

Corré Sí/No contra el cierre en curso. **Cerrá primero los ★.**

**★ Consenso real (primero):**
1. ★ WhatsApp es el canal central de cierre y recuperación (no se depende del email). *(4 voces)*
2. ★ Abrís la ventana 24h con palabra clave/botón ANTES de mandar masivo. *(Jordi+Natan+Daniel)*
3. ★ Recuperación de checkout disparada en <30 min. *(André+Daniel)*
4. ★ Si vendés por manada: incentivás "¡Yo compré!" + capturas. *(André+Cuadra)*
5. ★ Si ticket medio/alto: el cierre fino es en 1-a-1, no en el grupo. *(Daniel+Jordi)*

**◇ Una voz (después):**
6. ◇ Secuencias de botones/quiz para elevar conciencia pre-Clase 1. *(Daniel)*
7. ◇ 4 estados de checkout automatizados. *(Daniel)*
8. ◇ Lead Scoring para priorizar closers. *(Jordi)*
9. ◇ Filtro por precio desde el anuncio. *(Jordi)*
10. ◇ Enlace de pago directo + asistencia P2P. *(Cuadra)*
11. ◇ Disparadores de palabra clave flexibles. *(Natan)*
12. ◇ Check-in orgánico con boleto personalizado. *(Natan)*
13. ◇ Trazabilidad UTM end-to-end. *(Daniel)*
14. ◇ Closers en plataforma centralizada auditable. *(Daniel)*
15. ◇ Grupos ≤250 con conversación / broadcast si grandes. *(André/Cuadra)*

---

## Benchmarks (proyectar con cuidado)

- Conversión manada: **6-8% hispano** (no uses 15-20% brasileño). Downsell 2%.
- Recuperación checkout: <30 min (pierde 80% después).
- Opt-in landing → WhatsApp: piso 70%.
- CPL LATAM low ticket: ~$0.14 [¿?] / ROAS ~13 [¿?] (transcript Cuadra corrupto — verificar).
- Caso Daniel $700k en 15 min [¿?] (claim de una voz).
- Ventana Meta: 24h desde última interacción.

`[¿?]` = número heredado de transcript sucio; verificar antes de proyectar caja.

---

## Huecos (buscar afuera)

- **Anti-baneo infraestructura** → doctrina externa del operador (sección arriba).
- **Reactivación de no-compradores** 30/60/90 días.
- **Email como sistema** → doctrina externa (Kennedy/Schwartz).
- **API oficial vs. no oficial** (riesgo/costo/escala): nadie lo compara.

## Referencia completa

`CEREBRO/DYNAMIS/sintesis/C_whatsapp_grupos_chat.md`.

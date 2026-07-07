===FICHA===
EXPERTO: Marcelo Távora
CLASE: Decisiones Inteligentes, Mayores Ganancias: El Poder del Business Intelligence con Marcelo Távora
ESPINA: B-Agencia
TEMA(S): Business Intelligence (BI) en lanzamientos, optimización de creativos (Kanban de creativos), Lead Scoring, y encuestas de calificación automatizadas.

TESIS CENTRAL:
El dinero que no tienes en tu negocio digital está en los datos que no estás mirando; la optimización de creativos basada en la tasa de visualización de los 3 primeros segundos (TSR) y la calificación de leads (Lead Scoring) mediante encuestas automatizadas por WhatsApp/API oficial permiten escalar la facturación y detener pérdidas en tiempo real.

FRAMEWORKS:
- El Kanban de Creativos (VK):
  - Clasificación de anuncios en tres categorías:
    1. No Probados: Anuncios que han gastado menos de 100 reales en Meta/Google. Deben forzarse a ser probados con presupuesto exclusivo.
    2. Perdedores: Anuncios con ROAS negativo o menor a 1. Se pausan de inmediato.
    3. Ganadores (Campeones): Anuncios con ROAS positivo y alto volumen. Se analizan para optimizarlos y replicar su estructura de copy.
- Tasa de Visualización de los 3 Primeros Segundos (TSR - Three Second Retention):
  - Métrica clave: TSR = (Visualizaciones de 3 segundos / Impresiones) * 100.
  - Si un anuncio tiene excelente copy pero bajo TSR (ej. 25%), el problema es el gancho visual inicial.
  - Solución: Cambiar únicamente los primeros 3 segundos del video (ej. poner la imagen del resultado o el elemento disruptivo en el segundo cero), duplicando el TSR (ej. a 51%) y bajando el CPL a la mitad sin que el experto tenga que grabar nada nuevo.
- Lead Scoring (Puntuación de Leads - El Titanic de los Negocios):
  - Lógica de Titanic: Cruzar datos (ej. género + clase de boleto) da una previsibilidad absoluta de supervivencia. En lanzamientos, cruzar datos del lead (ej. profesión + ingresos) da una previsibilidad absoluta de compra.
  - Implementación: Añadir preguntas de calificación en la página de gracias o enviarlas por WhatsApp/API oficial inmediatamente después del registro.
  - Pregunta de Calificación: Debe tener una razón operativa estricta (ej. en BebeFeed: ingresos familiares, tiempo disponible para entrenar). No preguntes por preguntar (ej. preguntar si tienen diástasis no afectaba la conversión, por lo que se eliminó).
  - Uso de Datos: Si los leads de un creativo específico tienen bajo Lead Scoring (ej. no tienen experiencia o ingresos bajos), se detiene la inversión en ese creativo, incluso si su CPL es muy bajo.

REGLAS / HEURÍSTICAS:
- "No optimices solo por el CPL más bajo, optimiza por el CPL calificado más bajo": Un creativo puede traer leads a centavos, pero si su Lead Scoring es cero, estarás tirando tu dinero de pauta.
- "No llames 'encuesta' a tu formulario, llámalo 'Quiz' o 'Registro de Alumnos'": Cambiar el nombre y ofrecer un manual o bono exclusivo (ej. "Manual de pérdida de panza") al finalizar eleva la tasa de respuesta del 15% al 30%+.

PROCESOS / GUIONES:
- Flujo de Captación y Calificación con ManyChat/API de WhatsApp:
  1. El lead se registra en la landing page (deja nombre y teléfono).
  2. Se dispara un webhook (vía Make) que envía un mensaje por WhatsApp (API oficial) con un botón fake de bloqueo: *"Hola [Nombre], tu registro al evento está confirmado. Presiona 'Recibir información' para evitar bloqueos y recibir los accesos..."* (Logra 80% de tasa de clics).
  3. Al hacer clic, se le envía el Quiz/Registro de Alumnos. Si no responde en 15 minutos, se envía un recordatorio automático.

BENCHMARKS / NÚMEROS:
- Facturación de Marcelo Távora: Casi 80 millones de reales en co-producciones en Brasil.
- Resultados de optimización de TSR: Un anuncio pasó de 25% a 51% de TSR, bajando el CPL de 1.22 a 1.00 real y duplicando los leads generados (de 44k a 92k) con el mismo presupuesto.
- Tasa de respuesta ideal de encuestas/quizzes: Mínimo 15% a 17% de la lista (BebeFeed logra 31% - 32%, y productos de finanzas logran hasta 94% al condicionar el ingreso al grupo de WhatsApp).

EJEMPLOS / CASOS:
- Caso del lanzamiento de manicuristas (Mayo 2023) → Invirtieron 211,000 reales en pauta. El CPL era baratísimo, pero el lanzamiento dio pérdida de 100,000 reales. Al analizar los datos, descubrieron que el 70% de los compradores reales eran manicuristas con experiencia, mientras que el 70% de los leads fríos atraídos por el anuncio barato eran personas sin experiencia y sin ingresos. Un año después, limitaron la pauta de público frío a solo 13,000 reales calificados, logrando la misma facturación y un ROAS espectacular.

ERRORES SEÑALADOS:
- Escalar campañas basándose únicamente en el CPL de Meta/Google → Consecuencia: Pérdidas masivas de dinero en lanzamientos al atraer leads que no tienen el perfil ni el dinero para comprar.
- Hacer preguntas en la encuesta que no tienen impacto directo en la conversión → Consecuencia: Fricción innecesaria y caída de la tasa de respuesta.

INSIGHTS DEL Q&A:
- Cómo integrar los datos de forma simple: Marcelo recomienda usar Windsor.ai (la herramienta de extracción de datos más barata) para conectar Meta y Google a planillas de Excel/Google Sheets, y usar Make para integrar ActiveCampaign con ManyChat/WhatsApp API.

TENSIONES:
- Fricción vs. Calidad: Pedir el teléfono y hacer preguntas calificadoras aumenta el costo por lead (CPL) en el administrador de anuncios, pero eleva drásticamente la calidad de la lista y la tasa de conversión final.

CONDICIONES DE CONTEXTO:
Aplica para agencias que manejan presupuestos de tráfico medianos y grandes y buscan profesionalizar su toma de decisiones mediante Business Intelligence (BI).

FRASES-ANCLA:
- "El dinero que no tienes está en los datos que no estás mirando."
- "No optimices por el CPL más bajo, optimiza por el CPL calificado más bajo."

ASUME QUE YA SABÉS:
LTV, CAC, BI, TSR, UTM, Webhook, Make, ActiveCampaign, ManyChat, Windsor.ai, Typeform.

DENSIDAD:
Extremadamente Alta. Aporta frameworks de optimización de creativos y calificación de leads sumamente técnicos. Relleno estimado: 5%.
===FIN FICHA===

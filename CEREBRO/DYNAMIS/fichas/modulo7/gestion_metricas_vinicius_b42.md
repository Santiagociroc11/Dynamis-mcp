===FICHA===
EXPERTO: Vinícius Loureiro, Clever, Lucas, Gabriel (Agencia V92 / B42)
CLASE: Gestión De Métricas Para El Éxito con Vinícius Loureiro & B42
ESPINA: B-Agencia
TEMA(S): Estructuras de control de datos (Lanzamientos, Evergreen directo, Evergreen con equipo comercial), centralización de base de datos (PostgreSQL, N8N, Make), reportes semanales de alta retención para clientes, automatización de reportes con Inteligencia Artificial (OpenAI GPT, PostgreSQL).

TESIS CENTRAL:
La data centralizada y estructurada es el activo más valioso de una agencia; permite optimizar presupuestos en tiempo real (deteniendo inversiones donde el equipo comercial o el tráfico no performan), mejorar la retención de clientes mediante reportes semanales de alto nivel, e identificar patrones de compra mediante IA.

FRAMEWORKS:
- Estructuras de Control de Data en la Agencia (V92):
  1. Inversiones Generales del Negocio (ROAS general).
  2. Data para Lanzamientos (evaluación por fases: captación, distribución, ventas).
  3. Data para Evergreen con Tráfico Directo.
  4. Data para Evergreen con Equipo Comercial (leads generados vs. capacidad de atención del equipo).
- El Reporte Semanal de Alta Retención para el Cliente (Lucas - Academia de Autismo):
  - No mostrar dashboards complejos de operación interna al experto.
  - Mostrar un reporte simplificado con:
    1. Comparación con el mes anterior y meta de crecimiento del 20% en ventas.
    2. Estrategia de maximización de faturamento (+20% adicional) mediante Upsells, Order Bumps y Downsells (ej. suscripción a 1 real en el order bump que pasa a 39 reales al mes siguiente).
    3. Balance semanal de ROAS y estacionalidad del mes (ej. en Brasil, el crédito se abre en las semanas 2 y 3 tras el pago de tarjetas).
    4. Métricas del equipo comercial (leads enviados vs. ventas realizadas).
- Automatización de Base de Datos con N8N y Hotmart:
  - Webhook de Hotmart → Normalización de teléfono (código de país, ciudad, dígitos) → Llamada a la API de Hotmart (para traer datos adicionales de afiliados, co-productores, cupones, cuotas, moneda) → Conversión de moneda (pesos colombianos a reales/dólares) → Inserción PostgreSQL (tablas: compras, alumnos, leads, productos, cerradores).
- Agentes de IA para Consultar Base de Datos (Gabriel):
  - Conectar base de datos PostgreSQL a N8N utilizando nodos de IA (OpenAI GPT).
  - Desactivar la memoria del agente de IA para evitar alucinaciones (forzarlo a buscar directo en la base de datos SQL en lugar de recordar chats pasados).
  - Prompt estructurado con la relación de tablas (compras, alumnos, leads, cerradores) para generar reportes automáticos de ventas y enviarlos por WhatsApp.

REGLAS / HEURÍSTICAS:
- "No muestres dashboards de Power BI complejos al cliente; usa reportes semanales simplificados en PDF": El cliente se abruma con la data cruda. El reporte debe mostrar solo las métricas clave de negocio, metas y planes de acción.
- "Asigna KPIs específicos a cada rol del equipo (diseñador, copy, tráficer)": Los indicadores personales deben ponerse en rojo o verde automáticamente en el dashboard interno para que cada miembro sepa si su trabajo está funcionando.
- "No escales la generación de leads si el equipo comercial está saturado": Limita el tráfico a la capacidad real de atención de los cerradores para aumentar la conversión y el ROAS, reduciendo la inversión.

PROCESOS / GUIONES:
- Flujo de Normalización de Teléfonos en N8N (JavaScript):
  - Código para formatear números de teléfono internacionales antes de ingresarlos a la base de datos Postgres, asegurando que tengan el código de país, código de ciudad y número de dígitos legibles para secuencias de WhatsApp.
- Prompt del Agente de IA para Reporte de Ventas Semanal:
  - Prompt estructurado en N8N que detalla las tablas de PostgreSQL y sus relaciones, indicando al modelo de OpenAI cómo realizar la consulta SQL sin alucinar y cómo formatear el mensaje final para enviarlo por WhatsApp al equipo.

BENCHMARKS / NÚMEROS:
- Meta de facturación mensual de la Academia de Autismo: 800,000 reales.
- Meta de crecimiento mensual en ventas de Evergreen: 20%.
- Incremento de facturación mediante Order Bump de suscripción a 1 real (que pasa a 39 reales al mes siguiente): +20% adicional (logrando un +40% de faturamento total sin aumentar presupuesto de tráfico).
- Volumen de ventas de bajo ticket en la Academia: ~3,000 ventas al mes.
- Límite de leads semanales para el equipo comercial en el caso de estudio: Máximo 600 leads (superar este número bajaba el ROAS y saturaba a los cerradores).
- ROAS promedio de nuevas ventas en abril: Pasó de 2.4 a 7.0 al reducir la inversión en tráfico y limitar los leads enviados al equipo comercial.

EJEMPLOS / CASOS:
- Caso de la Estacionalidad del Crédito en Brasil → Al analizar la data semanal, la agencia descubrió que el ROAS es muy bajo en la semana 4 y muy alto en las semanas 2 y 3. Esto ocurre porque en Brasil la gente cobra su nómina al inicio del mes, paga sus tarjetas de crédito y se le libera el cupo de compra en las semanas siguientes. Lección: Concentrar el presupuesto de pauta de Evergreen en las semanas 2 y 3 del mes.
- Caso de la Academia de Autismo y la Recurrencia → Pasaron de una recurrencia mensual de 60,000 reales a más de 1 millón de reales en 2-3 años, enfocando toda la estrategia de Evergreen en meter a los compradores de productos baratos en una suscripción de 1 real en el Order Bump.

ERRORES SEÑALADOS:
- Limpiar la base de datos de ActiveCampaign para ahorrar costos de suscripción sin respaldar los leads → Consecuencia: Pérdida masiva de datos históricos de leads que costaron caro y que podrían comprar otros productos durante los siguientes 2-4 años.
- Dejar que el equipo comercial pida más leads sin auditar su tasa de conversión real → Consecuencia: Desperdicio de presupuesto en tráfico, leads acumulados sin atender y caída drástica del ROAS.

INSIGHTS DEL Q&A:
- Base de datos en ClickUp vs. Postgres/Excel: Gabriel no recomienda ClickUp para centralizar bases de datos complejas. Recomienda usar PostgreSQL (para bases de datos estructuradas grandes) o Google Sheets/Excel para bases de datos más sencillas, conectadas mediante N8N.

TENSIONES:
- Data Cruda vs. Data de Negocio: La agencia necesita dashboards internos hiper-complejos (Power BI, PostgreSQL) para la toma de decisiones técnicas diarias, pero debe "filtrar" esa información al cliente presentándole únicamente métricas de negocio y planes de acción sencillos para mantener su confianza y retención.

CONDICIONES DE CONTEXTO:
Aplica para agencias maduras que gestionan múltiples productos de Evergreen y lanzamientos, y buscan centralizar su data para automatizar reportes y optimizar el rendimiento del equipo comercial.

FRASES-ANCLA:
- "Creemos en muchas cosas, pero los datos son los que dicen la verdad."
- "El reporte semanal al cliente nos pone 10 o 20 pasos adelante y asegura su retención."
- "La ventaja competitiva en la era de la IA son los datos que posees."

ASUME QUE YA SABÉS:
PostgreSQL, N8N, Webhook, Power BI, Order Bump, Upsell, Downsell, Recurring Payment (Recurrencia), Lead Scoring, CRM, Clint.

DENSIDAD:
Extremadamente Alta. Es una clase maestra sobre infraestructura de datos, automatizaciones con N8N e IA, y gestión de clientes de agencia. Relleno estimado: 5%.
===FIN FICHA===

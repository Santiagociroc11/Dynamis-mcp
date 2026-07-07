===FICHA===
EXPERTO: Natan (Analista de BI de la Agencia V92)
CLASE: Cómo estructurar una automatización del flujo de check-in en Instagram
ESPINA: Mixta
TEMA(S): Flujo de check-in en Instagram, generación de entradas personalizadas con foto y nombre, túneles de Cloudflare, integración de GitHub, N8N, ManyChat y API de Instagram.

TESIS CENTRAL:
El flujo de check-in en Instagram permite captar leads de forma orgánica y masiva mediante comentarios en publicaciones, elevando el compromiso del usuario al entregarle una entrada (boleto) personalizada con su foto de perfil y nombre de forma 100% gratuita y automatizada.

FRAMEWORKS:
- El Flujo de Check-in Estándar (Sin Entrada):
  1. Publicación en Instagram (orgánica o pautada) al menos 23 horas antes del evento (ej. si el evento es el día 2 a las 2:00 PM, publicar el día 1 a las 3:00 PM).
  2. Disparador de comentario (palabra clave: "Yo quiero").
  3. Mensaje inicial por DM de Instagram con un botón de texto (obligatorio para que el usuario interactúe y abra la ventana de conversación de 24 horas de Meta).
  4. Captura de datos (Nombre) guardado en una variable de texto.
  5. Mensaje con información del evento y entrega del obsequio prometido.
  6. Secuencia de avisos (Aviso 1: Falta 1 hora; Aviso 2: Empezó el evento).
- El Flujo de Check-in con Entrada Personalizada (Lucas / Natan):
  1. Seguir los pasos 1 a 4 del flujo estándar.
  2. Llamar a la API de ManyChat mediante solicitud GET para extraer la URL de la foto de perfil de Instagram del usuario (`FilePike` / `foto insta`).
  3. Enviar una solicitud POST al backend de la herramienta de generación de imágenes con: URL de la imagen base (boleto), URL de la foto de perfil (superpuesta), y el Nombre capturado.
  4. Guardar la URL de la imagen resultante en una variable (`boleto_personalizado`).
  5. Enviar la imagen personalizada al usuario de forma independiente a la secuencia de mensajes (para evitar que se rompa el flujo si la API falla).
- Infraestructura Técnica para Generación de Imágenes (Open Source):
  - Herramienta de código abierto en GitHub para generar imágenes.
  - Cloudflare Tunnel: Crear un túnel para exponer el localhost de la PC a internet de forma segura.
  - Subdominios en Cloudflare: `front.tudominio.com` (apuntando a HTTP localhost:5173 para el frontend en Vite) y `back.tudominio.com` (apuntando a HTTP localhost para el backend).
  - Clonar repositorio → `npm install` → `node Setup` (configurar dominio raíz, subdominio back, contraseña) → `node Start` (iniciar backend y frontend) → Diseñar la plantilla del boleto en la interfaz web (ajustar posición de la foto y texto, generar URL base) → Configurar la solicitud POST en ManyChat.

REGLAS / HEURÍSTICAS:
- "Siempre inicia el flujo de Instagram con un botón de texto en el primer DM": Meta exige una interacción activa del usuario para abrir la ventana de 24 horas. Si envías texto directo sin que presionen un botón, la automatización se detendrá.
- "Mantén la imagen del boleto separada de tu secuencia de mensajes principal": Si la API de generación de imágenes falla o tarda en responder, el flujo del usuario no debe detenerse; debe recibir la información del evento de todas formas.
- "Configura disparadores flexibles para palabras clave": No uses solo "yo quiero". Configura disparadores que detecten variaciones con tildes ("yo quiero"), errores comunes o frases largas para no perder leads.

PROCESOS / GUIONES:
- Proceso de Clonación y Setup de la Herramienta de Entradas (Terminal VSCode):
  1. Clonar repositorio: `git clone [URL_HTTPS]`
  2. Instalar dependencias: `npm install`
  3. Ejecutar Setup: `node setup` (ingresar dominio raíz de Cloudflare, subdominio back y definir contraseña de acceso).
  4. Iniciar aplicación: `npm run dev` o `node start` (inicia backend y frontend).
- Configuración de la Solicitud POST en ManyChat (Cuerpo JSON):
  - Enviar solicitud tipo POST a la URL de tu backend (`back.tudominio.com`) con el cuerpo JSON que contiene: la URL de la imagen base, la variable de la foto de Instagram (`foto insta`) y la variable del nombre del contacto. Mapear la respuesta de la API guardando el enlace del boleto generado en una nueva variable.

BENCHMARKS / NÚMEROS:
- Margen de tiempo para publicar el post de check-in: Mínimo 23 horas antes del evento en vivo.
- Ventana de atención estándar de Instagram: 24 horas desde la última interacción del usuario.
- Puerto por defecto del frontend (Vite): 5173.

EJEMPLOS / CASOS:
- Caso de la Entrada de Check-in en Instagram → El usuario comenta "Yo quiero" en el post del experto. ManyChat le envía un DM felicitándolo y pidiéndole su nombre. Al responder, la API genera en tiempo real una entrada digital con su foto de perfil de Instagram redonda y su nombre impreso en la parte inferior. Esto genera un efecto "wow", aumentando la asistencia al live y motivando al usuario a compartir la entrada en sus historias de Instagram de forma orgánica.

ERRORES SEÑALADOS:
- Usar herramientas de pago costosas para generar imágenes personalizadas → Consecuencia: Costos innecesarios para la agencia en flujos masivos (es mejor usar la herramienta open-source con Cloudflare Tunnels).
- No borrar los bloques de espera (Weights) de fecha específica al realizar pruebas de flujo → Consecuencia: ManyChat no permite guardar ni activar el flujo si tiene bloques de fecha sueltos o inconsistentes.
- No prever variaciones en la palabra clave del comentario → Consecuencia: Pérdida de hasta un 20% de leads que escriben la palabra con errores de ortografía o espacios adicionales.

INSIGHTS DEL Q&A:
N/A.

TENSIONES:
- Automatización Compleja vs. Estabilidad: Generar imágenes personalizadas eleva drásticamente el engagement, pero añade un punto de falla técnico (la API, el túnel de Cloudflare). La automatización debe diseñarse de modo que, si el boleto falla, el flujo de información principal siga activo.

CONDICIONES DE CONTEXTO:
Aplica para agencias que buscan estrategias de captación orgánica de alta conversión en Instagram para lanzamientos de infoproductos.

FRASES-ANCLA:
- "Atrae a la gente orgánicamente con tu publicación sin tener un costo adicional."
- "Siempre mantenga esa imagen del boleto separada de su secuencia de mensajes."

ASUME QUE YA SABÉS:
ManyChat, Cloudflare, Túneles de Cloudflare, DNS, GitHub, Vite, Localhost, API de Instagram, Solicitud POST/GET, JSON, Variable de sistema.

DENSIDAD:
Extremadamente Alta. Es un tutorial técnico paso a paso sumamente detallado para desarrolladores y traffickers de agencias. Relleno estimado: 5%.
===FIN FICHA===

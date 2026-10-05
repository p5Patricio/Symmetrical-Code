# Investigación por servicio: dolores, datos y mensaje de cada video

Complementa [`software-empresarial.md`](software-empresarial.md) con los otros cinco servicios del sitio. Mismo criterio:

- **Las cifras sirven para entender el problema, no para ponerlas en el anuncio.** Por regla de marca (README / `DESIGN.md` §10) los videos no muestran estadísticas. Cuentan cada dolor como una situación que el cliente reconoce.
- **Las promesas de cada video salen del propio sitio** (`src/data/services.ts`): soluciones, entregables y preguntas frecuentes. No se inventa nada nuevo.
- ⚠️ marca datos de una sola fuente secundaria o de un estudio de proveedor. Úsalos para orientar el mensaje, no como dato duro.

---

## 1. Implementación de IA (`inteligencia-artificial`, acento `#a855f7`)

**Qué les duele**
- Mucho tiempo en tareas manuales. 44% de las pymes mexicanas pierde hasta 10 horas a la semana en tareas repetitivas ⚠️ (estudio Alegra 2026). 38% no tiene digitalizada la facturación, la conciliación de pagos ni el inventario ⚠️.
- La IA ya llegó, pero se usa poco. Alrededor de 63% de las empresas que la usan se queda en lo básico. Las barreras principales son la falta de conocimiento (38%), de herramientas (28%) y los datos en silos (20%). La mitad de las pymes señala la falta de acompañamiento como el obstáculo número uno.
- Los clientes quieren respuesta inmediata. Más de la mitad de los consumidores espera respuesta en canales de mensajería en menos de 5 minutos ⚠️.

**Mensaje del video**
- **Dolores:** tecleas cada factura dato por dato · tus clientes preguntan y nadie responde · la respuesta está en algún PDF.
- **Solución:** lee facturas y contratos sin teclear · responde con la información de tu empresa · tus datos bajo tu control · en tu WhatsApp, web o sistema.
- **Promesas (sitio):** respuestas solo con tus documentos (RAG) · definimos contigo qué datos usa la IA · panel de respuestas y costos · calibración y ajustes continuos.

## 2. Web, apps y venta en línea (`desarrollo-web-movil`, acento `#00e5ff`)

**Qué les duele**
- La velocidad: según Google, 53% de las visitas desde el celular se abandonan si la página tarda más de 3 segundos. Pasar de 1 a 3 s de carga sube 32% la probabilidad de rebote.
- Estar fuera de lo digital: alrededor de 38–40% de las pymes no tiene presencia digital (Concanaco y estudios 2025).
- Webs que no convierten: "Empresas que quieren renovar una web vieja o lenta que no genera consultas ni ventas" es el primer perfil en `services.ts`.

**Mensaje del video**
- **Dolores:** tu página tarda y el cliente se va · en el celular no se ve bien · no te genera ni un mensaje.
- **Solución:** webs rápidas en cualquier pantalla · apps iOS y Android · cobra en línea · lista para que Google te encuentre.
- **Promesas (sitio):** diseño adaptado a cualquier pantalla · SEO técnico desde el día uno · analítica de conversiones configurada · código 100% tuyo.

## 3. Seguridad, infraestructura y soporte (`ciberseguridad`, acento `#facc15`)

**Qué les duele**
- México recibe una presión enorme: 35,200 millones de intentos de ciberataque en el primer trimestre de 2025, segundo lugar en América Latina (Fortinet / FortiGuard Labs, vía DPL News).
- En las pymes: más de 60% ha sufrido intentos de robo de datos, ransomware o accesos no autorizados en el último año, y un ataque podría paralizar la operación de 75.5% de ellas ⚠️ (SILIKN).
- Causas comunes: contraseñas compartidas, sin respaldos y sistemas sin parches. Los sistemas legados sin soporte son blanco frecuente (ver la investigación de software empresarial).

**Mensaje del video**
- **Dolores:** todos usan la misma contraseña · tu último respaldo fue… nunca · tu sistema lleva años sin actualizarse.
- **Solución:** auditamos y cerramos los huecos · cifrado de contraseñas, documentos y datos · respaldos automáticos listos para restaurar · monitoreo con alertas.
- **Promesas (sitio):** reporte de vulnerabilidades por nivel de riesgo · doble factor y contraseñas cifradas · plan de recuperación ante fallas · soporte después de la entrega.
- **Cuidado en el copy:** nunca prometer "100% seguro" ni "invulnerable".

## 4. Diseño UI/UX (`diseno-ui-ux`, acento `#f43f5e`)

**Qué les duele**
- Procesos confusos que hacen perder ventas: 18% de los compradores en línea abandonó una compra solo por un checkout "demasiado largo o complicado". El checkout promedio muestra 23 campos cuando bastarían unos 12 (Baymard Institute).
- Corregir tarde cuesta más. Como dice el propio sitio, cambiar un botón en Figma toma minutos y ya programado puede tomar días.
- Productos inconsistentes: pantallas hechas por distintas personas, sin un sistema de diseño.

**Mensaje del video**
- **Dolores:** nadie encuentra el botón correcto · formularios que nadie termina · cada pantalla parece de otra empresa.
- **Solución:** diseñamos antes de programar · pruébalo con usuarios reales · pensado para el celular, a una mano · un sistema de diseño que crece contigo.
- **Promesas (sitio):** archivo Figma editable · prototipo navegable · componentes con todos sus estados · especificaciones para desarrollo.

## 5. Automatización, integraciones y datos (`automatizacion-analitica`, acento `#f97316`)

**Qué les duele**
- WhatsApp es el canal: más de 79% de los usuarios lo prefiere para hablar con empresas, y 57% de las pymes que lo usan reporta más ventas ⚠️ (Meta, vía Milenio y Expansión). Atender a mano no escala.
- Trabajo repetitivo: el mismo 44% que pierde hasta 10 horas semanales ⚠️, más el copiar y pegar entre sistemas que el sitio describe como dolor ("el personal tiene que copiar y pegar datos manualmente de un programa a otro").
- Herramientas que no se integran: 55% de las pymes dice que sus herramientas no se conectan entre sí (Float 2024, ver la investigación de software empresarial).

**Mensaje del video**
- **Dolores:** confirmas cada cita a mano, una por una · el reporte del lunes lo armas copiando y pegando · tus sistemas no se hablan.
- **Solución:** avisos por WhatsApp sin escribir a mano · cuando entra una venta, todo se actualiza · sistemas conectados · tus números en vivo.
- **Promesas (sitio):** flujos probados en producción · WhatsApp Cloud API oficial · dashboard con acceso seguro · monitoreo y alertas de errores.
- **Cuidado en el copy:** el sitio dice "24/7" en una FAQ, pero `DESIGN.md` lo prohíbe. El video no lo usa.

## Fuentes

- Pymes y tareas repetitivas (Alegra 2026) — [Ecosistema Startup](https://ecosistemastartup.com/?p=98728)
- Adopción de IA en México — [Xataka México](https://www.xataka.com.mx/robotica-e-ia/mexico-tiene-2-5-millones-empresas-usando-ia-problema-que-mayoria-solo-usa-para-basico), [Expansión](https://expansion.mx/tecnologia/2025/10/10/la-inteligencia-artificial-ya-no-es-opcion-para-las-pymes), [DPL News](https://dplnews.com/?p=116641), [KPMG México](https://kpmg.com/mx/es/tendencias/2026/04/ao-pymes-e-inteligencia-artificial-el-futuro-del-emprendimiento-en-mexico.html)
- Expectativas de tiempo de respuesta — [This & That](https://www.thisandthat.chat/blog/customer-response-time-statistics/), [Leadferno](https://leadferno.com/blog/survey-response-times-for-text-messages-vs-live-chat-replies)
- Velocidad móvil (Google) — [Think with Google](https://www.thinkwithgoogle.com/_qs/documents/1632/au-mobile-page-speed-new-industry-benchmarks.pdf), [MediaPost](https://www.mediapost.com/publications/article/284398/many-visitors-abandon-mobile-sites-if-load-time-to.html)
- Presencia digital de pymes — [Net Noticias / Concanaco](https://netnoticias.mx/juarez/el-40-de-las-pymes-mexicanas-no-tienen-presencia-digital-concanaco)
- Ciberataques en México — [DPL News](https://dplnews.com/?p=279777), [Mexico Business News](https://mexicobusiness.news/cybersecurity/news/mexico-records-406-billion-cyberattacks-attempts-1h25), [Crónica](https://www.cronica.com.mx/negocios/2026/01/31/por-que-las-pymes-mexicanas-son-el-objetivo-principal-de-ciberataques-en-2026/)
- Abandono de checkout (Baymard Institute) — [baymard.com](https://baymard.com/lists/cart-abandonment-rate), [Checkout usability](https://baymard.com/blog/ecommerce-checkout-usability-report-and-benchmark)
- WhatsApp y pymes en México — [Milenio](https://www.milenio.com/negocios/whatsapp-business-eleva-ventas-57-pymes), [Expansión](https://expansion.mx/tecnologia/2025/03/11/mexicanos-confia-whatsapp-comunicarse-empresas)

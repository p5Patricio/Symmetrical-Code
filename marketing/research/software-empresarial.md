# Investigación: qué necesitan las empresas del software empresarial

Base del guion del video `videos/software-empresarial/`. Público: dueños y responsables de operación de pymes en México (Guanajuato y remoto) que hoy administran su negocio con Excel, papel o un sistema genérico/viejo.

> **Cómo leer las cifras.** Son datos de terceros para entender el problema, no promesas de Symmetrical Code. Cada una indica su fuente y alcance. Las marcadas con ⚠️ vienen de una sola fuente secundaria o de una muestra pequeña: úsalas para orientar el mensaje, no las pongas en un anuncio sin revisar la fuente original. Por regla de marca (README / `DESIGN.md` §10), **el video no muestra cifras**: cuenta los problemas como situaciones que el cliente reconoce.

---

## 1. De qué se quejan (los dolores)

### 1.1 La operación vive en Excel, papel y procesos manuales
- En las MIPYMES mexicanas el uso de tecnología se reportó bajo y básico (entre 10% y 30% en 2021–2022), concentrado en videollamadas, navegadores y ventas en línea; las microempresas son las más rezagadas. ⚠️ (artículos académicos que analizan ENAPROCE / INEGI).
- Estudio local en pymes de Emiliano Zapata, Tabasco: 87.9% opera de forma manual y solo 12.1% lleva registros en computadora; 33% no tiene control interno. ⚠️ muestra local.
- Cuando sí digitalizan, muchas lo hacen con macros de Excel para entradas/salidas de inventario: el problema se mueve, no se resuelve.

### 1.2 Las hojas de cálculo tienen errores (y nadie sabe cuál es la versión buena)
- Revisión de 35 años de estudios (Poon et al., 2024): **94% de las hojas de cálculo usadas para decidir en empresas contienen errores**.
- Auditorías de campo con mejor metodología encontraron errores en al menos 86% de las hojas revisadas (Panko).
- Causa: las arman personas sin formación en desarrollo de software; cada copia (`final_v2`, `FINAL_bueno`) es una versión distinta de la verdad.

### 1.3 Información dispersa: no hay una sola fuente de verdad
- 55% de los dueños de pymes dice que sus herramientas no se integran entre sí (Float, State of SMBs in Canada 2024).
- 70% de las pymes **sin** una fuente única de datos reporta mala visibilidad de su flujo de efectivo, contra 24% de las que sí la tienen (mismo estudio).
- Solo 24% de las pymes mexicanas tendría información suficiente para planear. ⚠️ (citado como "Estudio sobre Digitalización de PYMES en México 2025", +2,800 empresas; no pudimos verificar el autor).

### 1.4 Tiempo perdido en capturar dos veces y buscar datos
- Un trabajador pasa en promedio 3.2 horas por semana buscando información (Slite, Enterprise Search Survey).
- La doble captura consume comúnmente de 2 a 5 horas por persona por semana. ⚠️ (blog de proveedor).

### 1.5 El software genérico no se adapta a cómo trabajan
- 58% de los comerciantes pyme dice que las implementaciones de ERP fallan porque el software no se ajusta a sus procesos; 37%, que no sirve para lo que necesitan (encuesta a comerciantes pyme, 2022, vía Retail Dive).
- Los ERP grandes tardan en promedio 195 días más de lo previsto y cuestan 34% más (misma encuesta).
- Las licencias parecen baratas al inicio, pero se acumulan (CRM + ERP + facturación + RH + reportes) y aun así siguen existiendo hojas de Excel para cubrir lo que el sistema no hace.

### 1.6 Sistemas viejos o sin soporte
- Los sistemas legados sin soporte dejan de recibir parches de seguridad y su mantenimiento sube con los años; en organizaciones grandes, mantenerlos se lleva 70–80% del gasto de TI (GAO, EE. UU.). ⚠️ dato de gobierno, no de pymes.
- El miedo principal al cambiar: **perder datos históricos o detener la operación** durante la migración.

### 1.7 Barreras para dar el paso (México)
Complejidad de la tecnología, desconocimiento de empleados y dueños, falta de infraestructura, **temor por la seguridad y privacidad de los datos** y falta de recursos para invertir (literatura académica sobre ENAPROCE).

---

## 2. Qué necesitan en realidad

1. **Una sola fuente de verdad**: inventario, compras, ventas y finanzas conectados; se captura una vez.
2. **Ver su negocio en tiempo real**, desde la oficina o el celular, sin esperar a que alguien "cuadre" el Excel.
3. **Un sistema que se adapte a sus procesos**, no al revés.
4. **Control de acceso**: que cada persona vea y edite solo lo que le toca.
5. **Cambiar sin riesgo**: migrar lo que ya tienen sin perder historial ni parar la operación.
6. **Certidumbre en el proyecto**: saber qué se va a entregar, cuánto cuesta y ver avances reales (contra la experiencia de ERPs que se retrasan y encarecen).
7. **No quedar atados a un proveedor.**

## 3. Mapa dolor → respuesta de Symmetrical Code

Todas las respuestas ya existen como promesa en el sitio (`src/data/services.ts`, `src/i18n/locales/es.json` → `team.workflow_steps`). No se inventa nada nuevo para el video.

| Dolor | Respuesta (texto del sitio) |
|---|---|
| Excel disperso, versiones duplicadas | Sistema propio que reemplaza las hojas dispersas y centraliza la operación en un solo lugar |
| Doble captura, datos que no cuadran | Inventarios, compras, ventas y finanzas integrados; todo el equipo trabaja en tiempo real |
| Software genérico que no se adapta | Sistemas a la medida de tu operación y tus reglas de negocio |
| Miedo a migrar o a perder historial | Migramos tu información sin detener el trabajo diario |
| Seguridad / quién ve qué | Tú decides qué ve y qué edita cada empleado |
| No saber qué pasa si no estás en la oficina | Entras desde cualquier dispositivo |
| Proyectos que se retrasan y encarecen | Alcance y costo definidos antes de construir; demos funcionales cada dos semanas |
| Quedar atado al proveedor | El código es 100% tuyo |

## 4. Mensaje del video

- **Gancho**: "¿Cuál es la versión final?". La escena de archivos `ventas_final_v2.xlsx` la reconoce cualquier dueño de pyme en un segundo.
- **Dolores** (uno por beat): doble captura → datos que no cuadran → software que no se adapta.
- **Giro**: "Hay una mejor forma."
- **Solución**: todo tu negocio en un solo sistema, a la medida, con permisos por rol, desde cualquier dispositivo.
- **Compromisos**: migración sin detener tu operación · alcance y costo claros antes de empezar · avances funcionales cada dos semanas · el código es 100% tuyo.
- **Cierre**: Symmetrical Code, software empresarial a la medida, "Cotiza tu proyecto", symmetricalcode.com.

## Fuentes

- Poon, P.-L. et al. (2024), revisión sobre calidad de hojas de cálculo — [Newswise](https://www.newswise.com/articles/study-finds-94-of-business-spreadsheets-have-critical-errors), [Xataka On](https://www.xatakaon.com/apps/a-new-study-says-94-of-excel-tables-contain-errors-how-a-formula-can-cause-an-economic-disaster)
- Panko, R. *Spreadsheet Errors: What We Know* — [arXiv 0802.3457](https://arxiv.org/pdf/0802.3457), [arXiv 1602.02601](https://arxiv.org/pdf/1602.02601)
- Float Financial, *State of SMBs in Canada 2024* — [floatfinancial.com](https://floatfinancial.com/blog/press-release-state-of-smbs-in-canada-2024)
- Encuesta a comerciantes pyme sobre ERP (2022) — [Retail Dive](https://retaildive.com/press-release/20220615-new-survey-reveals-major-erp-woes-for-sme-merchants)
- Slite, *Enterprise Search Survey Report* — [slite.com](https://slite.com/en/learn/enterprise-search-survey-findings)
- Costos de trabajo manual y doble captura — [Sand Labs](https://sandlabs.com.au/blog/hidden-cost-of-manual-work)
- Barreras de adopción tecnológica en MIPYMES mexicanas (ENAPROCE) — [Ciencia Latina](https://www.ciencialatina.org/index.php/cienciala/article/download/17424/25126), [Vinculatégica UANL](https://vinculategica.uanl.mx/index.php/v/article/download/1244/1224/9342), [INEGI ENAPROCE](https://www.inegi.org.mx/contenidos/programas/enaproce/2015/doc/enaproce_15.pdf)
- Control interno en pymes de Emiliano Zapata, Tabasco — [Biblat UNAM](https://biblat.unam.mx/ca/revista/universita-ciencia/articulo/principales-problemas-de-control-interno-en-pymes-de-emiliano-zapata-tabasco)
- Inventarios con macros de Excel en pymes — [Ciencia Latina](https://ciencialatina.org/index.php/cienciala/article/view/24941)
- Riesgos de sistemas legados — [Rise Up Labs](https://riseuplabs.com/hidden-costs-of-your-legacy-systems/), [BizCover](https://www.bizcover.com.au/blog/what-is-a-legacy-system-and-how-can-it-impact-your-business/)
- Licencias vs. sistema a medida en México — [Fencode](https://www.fencode.dev/blog/licencias-software-vs-sistema-a-medida-mexico-2026)
- Digitalización de pymes en México 2025 — [DPL News](https://dplnews.com/?p=304124), [Mundo Ejecutivo](https://mundoejecutivocdmx.com/tecnologia/crecimiento-de-la-adopcion-de-tecnologias-en-pymes-de-mexico-en-2025/)

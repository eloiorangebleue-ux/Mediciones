# Evolución Biomédica

Visualización de evolución de parámetros biomédicos desde Google Sheets.

## Estructura

- `apps-script/Code.gs` – Apps Script para publicar la hoja “Medidas” como JSON.
- `web/evolucion-biomedica.html` – Página que consume dicha API y muestra gráficos.

## Configuración

1. Despliega el Apps Script como **Aplicación web** (acceso público).
2. Reemplaza `SHEET_URL` en el HTML por la URL de tu Apps Script.
3. Sube `web/evolucion-biomedica.html` a tu hosting o WordPress.

## Tecnologías

- Google Apps Script
- Chart.js
- HTML5, CSS3, JavaScript

---
Eloi Puigdemont González — Orange Bleue Nou Barris  

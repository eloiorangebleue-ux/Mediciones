/**
 * Publica la hoja "Medidas" como JSON, filtrable por ?nombre= y ?apellido=.
 * Incluye limpieza de encabezados y parámetros.
 * Archivo: Code.gs
 */
function doGet(e) {
  // Asegurar existencia de parámetros
  const params = e && e.parameter ? e.parameter : {};
  const nombreFiltro = params.nombre ? params.nombre.toString().trim() : '';
  const apellidoFiltro = params.apellido ? params.apellido.toString().trim() : '';

  // ID de la hoja y obtención de la pestaña "Medidas"
  const SHEET_ID = '1TcEJDs30jw-UsEUuuncrl2Q2QOBsd4BqeAWqUETvglM';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Medidas');

  // Leer todos los datos de la hoja
  const rows = sheet.getDataRange().getValues();

  // Limpiar encabezados (trim) y extraerlos
  const headers = rows.shift().map(h => h.toString().trim());

  // Mapear cada fila a un objeto con clave=encabezado
  const records = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });

  // Filtrar por nombre si se proporcionó
  let filtered = records;
  if (nombreFiltro) {
    filtered = filtered.filter(r => r['Nombre'].toString().trim() === nombreFiltro);
  }
  // Filtrar por apellido si se proporcionó
  if (apellidoFiltro) {
    filtered = filtered.filter(r => r['Apellidos'].toString().trim() === apellidoFiltro);
  }

  // Devolver el JSON resultante
  return ContentService
    .createTextOutput(JSON.stringify(filtered))
    .setMimeType(ContentService.MimeType.JSON);
}

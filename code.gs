/**
 * Publica la hoja "Medidas" como JSON, con filtro opcional por cliente.
 */
function doGet(e) {
  const params = e.parameter || {};
  const nombreFiltro   = params.nombre   ? params.nombre.trim()   : '';
  const apellidoFiltro = params.apellido ? params.apellido.trim() : '';

  const SHEET_ID = '1TcEJDs30jw-UsEUuuncrl2Q2QOBsd4BqeAWqUETvglM';
  const sheet    = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Medidas');
  const rows     = sheet.getDataRange().getValues();
  const headers  = rows.shift().map(h => h.toString().trim());

  let records = rows.map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = r[i]);
    return obj;
  });

  // Filtrar por cliente si se especifica
  if (nombreFiltro) {
    records = records.filter(r => r['Nombre'].toString().trim() === nombreFiltro);
  }
  if (apellidoFiltro) {
    records = records.filter(r => r['Apellidos'].toString().trim() === apellidoFiltro);
  }

  // Ordenar por fecha ascendente
  records.sort((a, b) => new Date(a['Fecha']) - new Date(b['Fecha']));

  // Retornar JSON
  return ContentService
    .createTextOutput(JSON.stringify(records))
    .setMimeType(ContentService.MimeType.JSON);
}

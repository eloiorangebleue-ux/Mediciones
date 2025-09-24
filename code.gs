/**
 * Publica la hoja "Medidas" como JSON, filtrable por ?nombre= y ?apellido=.
 * Archivo: Code.gs
 */
function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const nombreFiltro = params.nombre ? params.nombre.trim() : '';
  const apellidoFiltro = params.apellido ? params.apellido.trim() : '';

  const SHEET_ID = '1TcEJDs30jw-UsEUuuncrl2Q2QOBsd4BqeAWqUETvglM';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Medidas');
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift().map(h => h.toString().trim());
  
  const records = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });

  let filtered = records;
  if (nombreFiltro) {
    filtered = filtered.filter(r => r['Nombre'].toString().trim() === nombreFiltro);
  }
  if (apellidoFiltro) {
    filtered = filtered.filter(r => r['Apellidos'].toString().trim() === apellidoFiltro);
  }

  return ContentService
    .createTextOutput(JSON.stringify(filtered))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Publica la hoja "Medidas" como JSON, filtrable por ?nombre=.
 */
function doGet(e) {
  const SHEET_ID = '1TcEJDs30jw-UsEUuuncrl2Q2QOBsd4BqeAWqUETvglM';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Medidas');
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  const records = rows.map(r => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = r[i]);
    return obj;
  });
  const output = e.parameter.nombre
    ? records.filter(r => r['Nombre'] === e.parameter.nombre)
    : records;
  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

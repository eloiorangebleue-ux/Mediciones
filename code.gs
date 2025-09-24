/**
 * Publica la hoja "Medidas" como JSON, filtrable por ?nombre=.
 * Archivo: Code.gs (en la raíz del repositorio)
 */
function doGet(e) {
  // ID de tu hoja (de la URL de Google Sheets)
  const SHEET_ID = '1TcEJDs30jw-UsEUuuncrl2Q2QOBsd4BqeAWqUETvglM';
  
  // Abrir hoja "Medidas"
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Medidas');
  
  // Leer todos los datos de la hoja
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift(); // Primera fila: encabezados
  
  // Mapear cada fila a objeto con claves headers[i]
  const records = rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  
  // Si existe parámetro ?nombre=, filtrar registros
  const nombre = e.parameter.nombre;
  const outputData = nombre
    ? records.filter(r => r['Nombre'] === nombre)
    : records;
  
  // Devolver JSON
  return ContentService
    .createTextOutput(JSON.stringify(outputData))
    .setMimeType(ContentService.MimeType.JSON);
}

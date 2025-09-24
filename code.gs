/**
 * Publica la hoja "Medidas" como JSON, con filtros de fecha y cliente.
 */
function doGet(e) {
  const params = e.parameter || {};
  const nombreFiltro = params.nombre ? params.nombre.trim() : '';
  const apellidoFiltro = params.apellido ? params.apellido.trim() : '';
  const fromDate = params.from || '';
  const toDate = params.to || '';

  const SHEET_ID = '1TcEJDs30jw-UsEUuuncrl2Q2QOBsd4BqeAWqUETvglM';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Medidas');
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift().map(h => h.toString().trim());

  let records = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });

  // Filtrar por nombre/apellidos
  if (nombreFiltro) {
    records = records.filter(r => r['Nombre'].toString().trim() === nombreFiltro);
  }
  if (apellidoFiltro) {
    records = records.filter(r => r['Apellidos'].toString().trim() === apellidoFiltro);
  }

  // Filtrar por rango de fechas ISO YYYY-MM-DD
  if (fromDate) {
    records = records.filter(r => new Date(r['Fecha']) >= new Date(fromDate));
  }
  if (toDate) {
    records = records.filter(r => new Date(r['Fecha']) <= new Date(toDate));
  }

  // Ordenar por fecha ascendente
  records.sort((a, b) => new Date(a['Fecha']) - new Date(b['Fecha']));

  return ContentService
    .createTextOutput(JSON.stringify(records))
    .setMimeType(ContentService.MimeType.JSON);
}

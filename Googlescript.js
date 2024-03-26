function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Obtém a data e hora atuais formatadas
  var now = new Date();
  var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

  // Adiciona uma nova linha na planilha com a data e hora atuais e os dados do formulário
  var newRow = sheet.appendRow([
    formattedDate, // Primeira coluna: Data e hora atuais
    data.nomeCompleto,
    data.dataNascimento, // Adiciona a data de nascimento após o nome completo
    data.celular, 
    data.matricula, 
    data.email, 
    data.curso, // Se curso for um objeto, considere usar data.curso.label ou data.curso.value dependendo do que deseja salvar
    // Note que o URL do arquivo será adicionado na próxima coluna, movendo para a coluna 8
  ]);

  // Verifica se um arquivo em base64 foi enviado e processa o upload para o Drive
  if (data.arquivoMatricula) {
    var folderId = '1NLnIYvX_lV1uulHn2r3aSjCBUdIJed2m'; // Use o ID real da sua pasta
    var folder = DriveApp.getFolderById(folderId);
    var decodedData = Utilities.base64Decode(data.arquivoMatricula.split(",")[1]);
    var contentType = data.arquivoMatricula.split(",")[0].split(":")[1].split(";")[0];
    var blob = Utilities.newBlob(decodedData, contentType, "arquivoUpload.pdf"); // Considerar ajustar o nome do arquivo se necessário
    var file = folder.createFile(blob);

    // Adiciona o URL do arquivo na mesma linha dos outros dados no Sheet
    sheet.getRange(sheet.getLastRow(), 8).setValue(file.getUrl()); // Agora é a coluna 8, ajustado para a adição da data de nascimento
  }

  return ContentService
         .createTextOutput(JSON.stringify({"result":"success"}))
         .setMimeType(ContentService.MimeType.JSON);
}

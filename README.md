# Formulário de Aplicação para Vaga de Emprego na Sensorville

Este projeto é uma aplicação web simples que visa coletar informações de candidatos interessados em se juntar à equipe da Sensorville. O formulário inclui campos para informações pessoais, acadêmicas e profissionais, além de permitir o upload de um currículo.

## Recursos Utilizados

- React JS
- React Select (para campos de seleção personalizados)
- React DatePicker (para seleção de datas)
- Google Apps Script (para processamento e armazenamento de formulários)
- Google Drive (para armazenamento de currículos)

## Estrutura do Projeto

O projeto é estruturado da seguinte forma:

- `src/components/`: Pasta contendo os componentes React utilizados no formulário.
  - `ReactForm.js`: Componente principal que renderiza o formulário.
  - `ReactFormLabel.js`: Componente auxiliar para renderizar labels dos campos de forma dinâmica.
- `public/`: Pasta contendo arquivos estáticos, como o `index.html`.
- `styles/`: Pasta contendo arquivos de estilo CSS.
- `README.md`: Este arquivo.

## Configuração Inicial

### Pré-requisitos

Antes de prosseguir, certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixá-los e instalá-los em [Node.js website](https://nodejs.org/en/download).

### Instalação

1. Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/andrebarbadoUFSC/SensorvillePS.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd SensorvillePS
   ```

3. Instale as dependências do projeto usando npm:

   ```bash
   npm install
   ```

## Como Usar

Preencha os campos do formulário com suas informações pessoais e profissionais. Selecione a data de nascimento usando o date picker, escolha o curso de interesse e faça upload do seu currículo. Após preencher todos os campos, clique em "Enviar".

# Google Sheets

# Integração Formulário - Google Sheets via Google Apps Script

Este projeto integra um formulário web diretamente a uma planilha do Google Sheets utilizando Google Apps Script, permitindo a coleta automática de submissões de formulário em uma planilha centralizada.

## Visão Geral

O script do Google Apps é utilizado para criar um serviço web que escuta por requisições POST contendo dados de submissão de um formulário. Quando uma submissão é recebida, o script processa os dados e os insere em uma planilha do Google Sheets, incluindo detalhes como nome completo, data de nascimento, celular, matrícula, email, curso selecionado e um link para o arquivo enviado (por exemplo, currículo).

## Planilha

A planilha que armazena os dados de submissão pode ser acessada aqui: [Planilha de Submissões](https://docs.google.com/spreadsheets/d/1ZoKOdCMM-_Gd9JsrEbokqqL1z_oX2phWTEJ0ybgZC8g/edit?usp=sharing)

## Código do Script

O seguinte código do Google Apps Script é utilizado para processar as submissões do formulário:

```javascript


function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var now = new Date();
  var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

  var newRow = sheet.appendRow([
    formattedDate,
    data.nomeCompleto,
    data.dataNascimento,
    data.celular,
    data.matricula,
    data.email,
    data.curso,
    // A coluna para o URL do arquivo será adicionada posteriormente
  ]);

  if (data.arquivoMatricula) {
    var folderId = '1NLnIYvX_lV1uulHn2r3aSjCBUdIJed2m';
    var folder = DriveApp.getFolderById(folderId);
    var decodedData = Utilities.base64Decode(data.arquivoMatricula.split(",")[1]);
    var contentType = data.arquivoMatricula.split(",")[0].split(":")[1].split(";")[0];
    var blob = Utilities.newBlob(decodedData, contentType, "arquivoUpload.pdf");
    var file = folder.createFile(blob);

    sheet.getRange(sheet.getLastRow(), 8).setValue(file.getUrl());
  }

  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}

```

## Como Utilizar

1. Crie um novo Google Apps Script associado à sua planilha do Google Sheets.
2. Copie e cole o código acima no editor de script.
3. Salve e publique o script como um serviço web.
4. Utilize a URL fornecida pelo Google Apps Script como endpoint para as submissões do seu formulário.

## Notas

- Certifique-se de ajustar o folderId para o ID da pasta do Google Drive onde você deseja armazenar os arquivos enviados.
- O script atual espera que os dados do formulário sejam enviados em formato JSON, incluindo o arquivo em base64 se aplicável.


## Contribuindo

Se você tiver sugestões para melhorar este projeto, suas contribuições são bem-vindas. Para contribuir:

1. Faça um Fork do projeto.
2. Crie uma Branch para sua Feature (`git checkout -b feature/SuaFeature`).
3. Faça commit de suas mudanças (`git commit -m 'Adicionado alguma feature'`).
4. Faça Push para a Branch (`git push origin feature/SuaFeature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo `LICENSE.md` para mais detalhes.


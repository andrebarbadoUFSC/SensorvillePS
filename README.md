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

Para rodar este projeto localmente, siga estes passos:

1. Clone o repositório para sua máquina local:

git clone https://github.com/seuusuario/seuprojeto.git

csharp
Copy code

2. Navegue até a pasta do projeto e instale as dependências:

cd seuprojeto
npm install

3. Inicie o servidor de desenvolvimento:

npm start

O projeto estará rodando no `localhost:3000`.

## Como Usar

Preencha os campos do formulário com suas informações pessoais e profissionais. Selecione a data de nascimento usando o date picker, escolha o curso de interesse e faça upload do seu currículo. Após preencher todos os campos, clique em "Enviar".

## Contribuindo

Se você tiver sugestões para melhorar este projeto, suas contribuições são bem-vindas. Para contribuir:

1. Faça um Fork do projeto.
2. Crie uma Branch para sua Feature (`git checkout -b feature/SuaFeature`).
3. Faça commit de suas mudanças (`git commit -m 'Adicionado alguma feature'`).
4. Faça Push para a Branch (`git push origin feature/SuaFeature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo `LICENSE.md` para mais detalhes.


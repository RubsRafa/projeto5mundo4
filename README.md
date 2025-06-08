# Visualização de Dados em Tempo Real com Azure IoT Hub

Este projeto faz parte de uma atividade prática da faculdade, com o objetivo de demonstrar a integração entre um dispositivo IoT e uma aplicação web que exibe, em tempo real, dados de temperatura e umidade provenientes de um Hub IoT da Azure.

O projeto utiliza como base o repositório oficial da Microsoft:  
**[web-apps-node-iot-hub-data-visualization](https://github.com/Azure-Samples/web-apps-node-iot-hub-data-visualization)**, com adaptações para atender aos requisitos acadêmicos.

O **[relatório de práticas](https://github.com/user-attachments/files/20646434/Projeto.Nivel.5.pdf)** foi confeccionado em formato PDF e produzido em conjunto com o desenvolvimento do projeto.

## 📌 Descrição Geral

A aplicação consiste em:

- Um **servidor Node.js** que se conecta ao **Azure IoT Hub** por meio de um grupo de consumidores do **Event Hub**, recebendo mensagens de telemetria de dispositivos conectados.
- Um **websocket** para enviar essas mensagens aos clientes da aplicação web.
- Uma **interface web** com um gráfico de linha, que exibe os dados de temperatura e umidade em tempo real.
- Um **simulador de dispositivo IoT** (ou dispositivo físico, opcionalmente) que envia os dados ao Hub.

### Arquivo `index.js`

Além dos arquivos do repositório base, este projeto inclui o arquivo `index.js`, que foi gerado automaticamente ao registrar o dispositivo no Azure IoT Hub, selecionando a linguagem Node.js como SDK. Esse arquivo contém o código responsável por simular um dispositivo IoT, enviando periodicamente dados de temperatura e umidade para o Hub.

## 🔧 Estrutura do Projeto

- `server.js`: inicializa o servidor, configura o websocket e gerencia a comunicação com o Event Hub.
- `scripts/event-hub-reader.js`: conecta-se ao Event Hub, extrai dados relevantes e repassa via callback.
- `public/index.html`: estrutura da interface web.
- `public/js/chart-device-data.js`: lógica de renderização do gráfico e comunicação com o websocket.
- `index.js`: simula o envio de dados de telemetria ao Hub (arquivo gerado automaticamente).
  
## 🚀 Como Executar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente:
   - IotHubConnectionString: string de conexão do seu IoT Hub (política "service").
   - EventHubConsumerGroup: nome do grupo de consumidores criado

3. Execute o projeto
   ```bash
   npm start
   ```
4. Acesse no navegador, http://localhost:3000

## Implantação no Azure

Caso deseje publicar a aplicação na nuvem, é possível fazer o deploy usando o Azure App Service, com suporte a Git para versionamento e publicação contínua.

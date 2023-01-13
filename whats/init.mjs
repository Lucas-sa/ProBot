import wppconnect from '@wppconnect-team/wppconnect';
import fetch from 'cross-fetch';
import moment from 'moment';

moment.locale('pt-br');

wppconnect
  .create({
    session: 'mySession',
    puppeteerOptions: {
      userDataDir: './whats/tokens/mySession', // or your custom directory
    },
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    let msgCliente = message.body.toLowerCase();
    
    if (msgCliente === 'menu') {
        // With buttons
        client.sendText(message.from, 'MENU:', {
          useTemplateButtons: true, // False for legacy
          buttons: [
            {
              id: '1',
              text: 'Resumo financeiro'
            },
            {
              id: '2',
              text: 'Financeiro detalhado'
            },
            {
              id: '3',
              text: 'add Entrada'
            },
            {
              id: '4',
              text: 'add Despesa'
            }
          ],
        })
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }

    if(msgCliente === 'financeiro detalhado'){
      fetch('http://191.252.192.168:3000/api/getEntradas/'+moment().format('MM'))
      .then((response) => response.json())
      .then((response) => {

        let msg = "";

        response.map((result, i ) => {

          msg += `
          Id: ${result.id} \n
          Descrição: ${result.descricao} \n
          Valor: ${valor} \n
          Data: ${data} \n
          Status: ${situacao}  
          `
          
          if(response.length !== ++i ){
            msg += "\n\n";
          }

        })

        client
        .sendText(message.from, msg)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });

      });
    }

    if(msgCliente === 'financeiro detalhado'){
      fetch('http://191.252.192.168:3000/api/getDespesas/'+moment().format('MM'))
      .then((response) => response.json())
      .then((response) => {

        let msg = "";
        
        response.map((result, i ) => {

          msg += ` 
          Id: ${result.id} \n
          Descrição: ${result.descricao} \n
          Valor: ${valor} \n
          Data: ${data} \n
          Status: ${situacao}  
          `
          
          if(response.length !== ++i ){
            msg += "\n\n";
          }

        })

        client
        .sendText(message.from, msg)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });

      });
    }

  });
}
import wppconnect from '@wppconnect-team/wppconnect';
import fetch from 'cross-fetch';
import moment from 'moment';

moment.locale('pt-br');

wppconnect
  .create({
    session: 'mySession',
    puppeteerOptions: {
      userDataDir: './tokens/mySession', // or your custom directory
    },
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hello') {
        // With buttons
        client.sendText(message.from, 'WPPConnect message with buttons', {
          useTemplateButtons: true, // False for legacy
          buttons: [
            {
              url: 'https://wppconnect.io/',
              text: 'WPPConnect Site'
            },
            {
              phoneNumber: '+55 11 22334455',
              text: 'Call me'
            },
            {
              id: 'your custom id 1',
              text: 'Some text'
            },
            {
              id: 'another id 2',
              text: 'Another text'
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
    if(message.body === 'getAll'){
      fetch('http://localhost:3000/api/getData/'+moment().format("MM"))
      .then((response) => response.json())
      .then((response) => {

        let msg = "";

        response.map((result, i ) => {

          const situacao = (result.status === 0 ) ? "Em aberto" : "Pago"

          const valor = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(result.valor)
          const data = moment(result.data).format('L');

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
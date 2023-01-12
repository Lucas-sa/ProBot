import fetch from 'cross-fetch';
import moment from 'moment';

fetch('191.252.192.168:3000/api/getAll')
.then((response) => response.json())
.then((response) => {

  response.map(result => {
    let situacao;
    if(+result.status === 0 ){
      situacao = "Em aberto";
    }
    const valor = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(result.valor)
    const msg = "Id: "+result.id+"\n"+"Descrição: "+result.descricao+"\n"+"Valor: "+valor+"\n"+"Data: "+moment(result.data).format('L')+"\n"+"Satus: "+situacao+"\n\n"

    console.log(msg)

  })

});

moment.locale('pt-br');
const { createApp, ref } = Vue
const entradas = ref('')
const totalEntradas = ref('')
const totalDespesas = ref('')
const saldo = ref('')

function getResumo() {
    fetch('http://191.252.192.168:3000/api/getResumo/' + moment().format("MM"))
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            totalEntradas.value = response[0].entradas
            totalDespesas.value = response[0].despesas
            saldo.value = response[0].saldo
        });
} getResumo()

function getEntradas() {
    fetch('http://191.252.192.168:3000/api/getEntradas/' + moment().format("MM"))
        .then((response) => response.json())
        .then((response) => {
            entradas.value = response
        });
} getEntradas()

createApp({
    data() {
        return {
            message: 'Hello Vue!',
            totalEntradas,
            totalDespesas,
            saldo,
            entradas
        }
    }
}).mount('#app')
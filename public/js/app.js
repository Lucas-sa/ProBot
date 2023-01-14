const { createApp, ref } = Vue

moment.locale('pt-br');
const entradas = ref('')
const totalEntradas = ref('')
const totalDespesas = ref('')
const despesasAbertas = ref('')
const despesasPagas = ref('')
const saldo = ref('')

function getResumo() {
    fetch('http://191.252.192.168:3000/api/getResumo/' + moment().format("MM"))
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            totalEntradas.value = response[0].entradas
            totalDespesas.value = response[0].despesas
            despesasPagas.value = response[0].despesasPagas
            despesasAbertas.value = response[0].despesasAbertas
            saldo.value = response[0].saldo

            let valfinal = totalDespesas.value / totalEntrdas.value;
valfinal = 100 * valfinal;
console.log(valfinal)

        });
}getResumo()

function getEntradas() {
    fetch('http://191.252.192.168:3000/api/getEntradas/' + moment().format("MM"))
        .then((response) => response.json())
        .then((response) => {
            entradas.value = response
        });
}getEntradas()

function formatNumber(valor){
    return "R$ "+Intl.NumberFormat('pt-br', {minimumFractionDigits: 2}).format(valor)
}

optionVelo = {
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '75%'],
      radius: '90%',
      min: 0,
      max: 100,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.25, '#FF6E76'],
            [0.5, '#FDDD60'],
            [0.75, '#58D9F9'],
            [1, '#7CFFB2']
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'inherit'
        }
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: 'inherit',
          width: 2
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: 'inherit',
          width: 5
        }
      },
      axisLabel: {
        color: '#464646',
        fontSize: 20,
        distance: -60,
        rotate: 'tangential',
        formatter: function (value) {
          if (value === 0.875) {
            return 'Grade A';
          } else if (value === 0.625) {
            return 'Grade B';
          } else if (value === 0.375) {
            return 'Grade C';
          } else if (value === 0.125) {
            return 'Grade D';
          }
          return '';
        }
      },
      title: {
        offsetCenter: [0, '-10%'],
        fontSize: 20
      },
      detail: {
        fontSize: 30,
        offsetCenter: [0, '-35%'],
        valueAnimation: true,
        formatter: function (value) {
          return Math.round(value * 100) + '';
        },
        color: 'inherit'
      },
      data: [
        {
          value: 0.7,
          name: 'Grade Rating'
        }
      ]
    }
  ]
};

optionPie = {
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    },
    title: {
      text: 'Grafico',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: [
        'Entradas',
        'Despesas',
        'Em Aberto',
        'Pagas',
        'Saldo',
      ],
    },
    series: [
      {
        name: 'Grafico Financeiro',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: totalEntradas, name: 'Entradas' },
          { value: totalDespesas, name: 'Despesas' },
          { value: despesasAbertas, name: 'Em Abertos' },
          { value: despesasPagas, name: 'Pagas' },
          { value: saldo, name: 'Saldo' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
}

// Charts

Vue.createApp({
    data() {
        return {
            totalEntradas,
            totalDespesas,
            saldo,
            entradas,
            optionPie,
            optionVelo,
            despesasPagas,
            despesasAbertas,
            formatNumber
        }
    }
})
.component('v-chart', VueECharts)
.mount('#app')
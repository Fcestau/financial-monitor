<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Gráficos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-text>
        <h1>Doughnut Chart</h1>
      </ion-text>
      <vue3-chart-js
        :id="doughnutChart.id"
        :type="doughnutChart.type"
        :data="doughnutChart.data"
      ></vue3-chart-js>
      <ion-text>
        <h1>Pie Chart</h1>
      </ion-text>
      <vue3-chart-js
        :id="pieChart.id"
        :type="pieChart.type"
        :data="pieChart.data"
      ></vue3-chart-js>
      <ion-text>
        <h1>Line Chart</h1>
      </ion-text>
      <vue3-chart-js
        :id="lineChart.id"
        :type="lineChart.type"
        :data="lineChart.data"
      ></vue3-chart-js>
    </ion-content>
  </ion-page>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';

export default {
  name: 'Chart',
  components: {
    Vue3ChartJs,
  },
  setup() {
    const doughnutChart = {
      id: 'doughnut',
      type: 'doughnut',
      data: {
        labels: ['BNA', 'Binance', 'IOL', 'Otro'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [Math.random(), Math.random(), Math.random(), Math.random()],
          },
        ],
      },
    };
    const pieChart = {
      id: 'pie',
      type: 'pie',
      data: {
        labels: ['BNA', 'Binance', 'IOL', 'Otro'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [Math.random(), Math.random(), Math.random(), Math.random()],
          },
        ],
      },
    };
    const lineChart = {
      id: 'line',
      type: 'line',
      data: {
        labels: ['BNA', 'Binance', 'IOL', 'Otro'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [Math.random(), Math.random(), Math.random(), Math.random()],
          },
        ],
      },
    };

    return {
      doughnutChart,
      lineChart,
      pieChart,
    };
  },
};
</script>

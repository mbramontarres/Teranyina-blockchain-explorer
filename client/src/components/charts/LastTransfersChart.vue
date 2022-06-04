<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :height="150"
    class="mb-6"

  />
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip,  LineElement, PointElement, BarElement, CategoryScale, LinearScale } from 'chart.js'
import gql from 'graphql-tag'
ChartJS.register(Title, Tooltip,  LineElement, BarElement, PointElement,CategoryScale, LinearScale)

export default {
  name: 'LineChart',
  components: { Line },

  data() {
    return {
      transferHistory:[],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
         scales: {
            y: 
                {
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 0,
                    }
                }
        },
        plugins: {
            title: {
                display: true,
                text: 'Transfers History'
            }
        }
        
      },
      
    }
  },
  computed: {
    chartData() {
          return {
            labels: this.transferHistory.map(i=> i._id),
            datasets: [
              {
                //labels: 'total',
                data: this.transferHistory.map(i=> i.total),
                backgroundColor: 'rgba(255,198,0, 0.8)',
                borderColor: 'rgba(255,198,0, 0.8)',
                hoverBackgroundColor: 'rgba(255, 255, 255, 0.8)',
                fill: false,
                showLine: true,
              },
            ],
          }
        },
  },
  apollo: {
    transferHistory:{
      query: gql`query{
      transferHistory {
        _id,
        total
      }
      }`,
    }

  },

}
</script>
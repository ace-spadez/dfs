<script>
  import { Scatter } from 'vue-chartjs'

  export default {
    extends:Scatter,
    data () {
      return {
        chartData: {
        //   labels: [1,3,6,7,8,9,10,14,15,20],
          datasets: [
            {
              label: 'Overall',
              data: [{x:1,y:200},{x:3,y:1000},{x:10,y:1500},{x:11,y:100}],
              fill: false,
              borderColor: '#000000',
              backgroundColor: '#2554FF',
              borderWidth: 3,
              showLine:true,
            },
             
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
<script>
  import { Scatter } from 'vue-chartjs'
import moment from 'moment'

  export default {
    extends:Scatter,
    props:{
      ratinghistory:{
        type:Array
      },
      category:{
        type:String
      }
    },
    methods:{
      getData: function(){
        return this.ratinghistory.map(rt=>{
        if(this.category=='all')
        return {y:rt.rating.r_all,x:Date.parse(rt.rated_date)}
                if(this.category=='physics')
        return {y:rt.rating.r_p,x:Date.parse(rt.rated_date)}
                if(this.category=='chemistry')
        return {y:rt.rating.r_c,x:Date.parse(rt.rated_date)}
                if(this.category=='maths')
        return {y:rt.rating.r_m,x:Date.parse(rt.rated_date)}

      })
      },
      getColor:function(){
        if(this.category=='all') return '#000000'
        if(this.category=='physics') return '#ff0000'
        if(this.category=='chemistry') return '#ffff00'
        if(this.category=='maths') return '#0000ff'
      }
    },
    data () {
      return {
        chartData: {
        //   labels: [1,3,6,7,8,9,10,14,15,20],
          datasets: [
            {
              label: this.category,
              data: this.getData(),
              fill: false,
              borderColor: this.getColor(),
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
              type:'linear',
              gridLines: {
                display: false
              },
              ticks: {
                userCallback: function(label, index, labels) {
                    return moment(label).format("DD/MM/YY");
                },
                // stepSize:1,
                // fixedStepSize:30*24*60*60*1000,
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
      console.log('data',this.getData())
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
/**
 * Created by Administrator on 2017/8/24.
 * This is the bar-chart component
 */
import {Bar, mixins} from 'vue-chartjs'
const {reactiveProp} = mixins

export default Bar.extend({
  mixins: [reactiveProp],
  props: ['chartData','options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})

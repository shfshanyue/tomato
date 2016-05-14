<style scoped>
.content {
  background-color: #fff;
}
</style>

<template>
  <div>
    <chart-panel :height="140" :text="{header: '最佳工作日', strong: '星期' + goodDay[0], percent: parseInt((goodDay[1] - evenCount) / evenCount * 100)}" :data="chart || {}">hello, world</Chartpanel>
  </div>
</template>

<script>
import Group from 'vux/components/group'
import ChartPanel from './chart-panel.vue'

import { groupItems } from '../store/getters'

export default {
  data () {
    return {

    }
  },
  ready () {
    
  },
  methods: {

  },
  components: {
    Group,
    ChartPanel
  },
  vuex: {
    getters: {
      groupItems
    }
  },
  computed: {
    recentWeek() {
      let date = new Date(),
          weeks = []
      for (let i=0; i<7; i++) {
        date.setDate(date.getDate() - 1);
        let dateStr = date.toLocaleDateString();
        console.log('datestr: ', dateStr)
        if (this.groupItems.hasOwnProperty(dateStr)) {
          weeks.unshift([date.getDay(), this.groupItems[dateStr].tomatos.length])
        } else {
          weeks.unshift([date.getDay(), 0])
        }
      }
      return weeks;
    },
    goodDay() {
      let max = 0, goodDay = 0;
      for (let day of this.recentWeek) {
        if (day[1] > max) {
          max = day[1]
          goodDay = day[0]
        }
      }
      let week = ['7', '1', '2', '3', '4', '5', '6']
      return [week[goodDay], max]
    },
    evenCount() {
      return this.recentWeek.map(key => key[1]).reduce((x, y) => x+y) / 7
    },
    chart() {
      return {
        title: { 
          
        },
        tooltip: {

        },
        xAxis: {
          data: this.recentWeek.map(key => key[0]),
          nameGap: 10,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          data: this.recentWeek.map(key => key[1])
        }],
        textStyle: {
          fontSize: 8
        },
        grid: {
          top: '2px',
          bottom: '2px',
          left: '6px',
          right: 0,
          backgroundColor: '#00f',
          borderColor: '#f00',
          containLabel: true
        }
      }
    }
  }
  
}
</script>

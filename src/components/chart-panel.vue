<template>
  <div class="panel" :style="{height: height + 'px'}">
    <div class="text">
      <div class="header" v-text="text.header"></div>
      <div class="strong" v-text="text.strong"></div>
      <div class="desc">
        比平均值高出 {{ text.percent }}%
      </div>
    </div>
    <div class="pic" v-chart="data">
      
    </div>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  padding: 15px 10px;
  margin: 20px 0;
  background-color: rgba(0, 150, 136, .1);
}

.text {
  flex: 1 0 30%;
}

.pic {
  flex: 1 0 70%;
}

.desc {
  color: #aaa;
  font-size: 0.8em;
}

.header {
  font-size: 1.1em;
}

.strong {
  font-weight: 600;
  font-size: 1.3em;
}
</style>

<script>
import echarts from 'echarts'

export default {
  props: {
    text: {
      type: Object
    },
    data: {
      type: Object
    },
    height: {
      type: Number
    }
  },
  directives: {
    chart: {
      bind() {
        this.vm.$nextTick(() => {
          this.chart = echarts.init(this.el);
        })
      },
      update(value) {
        this.vm.$nextTick(() => {
          if (value !== null) {
            this.chart.setOption(value); 
          }
        })
      }
    }
  }
}
</script>
<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: [Object, Array],
      required: false,
      default () {
        return {
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          yAxis: {
            type: 'value'
          },
          legend: {
            data: ['expected', 'actual']
          },
          series: [
            {
              name: 'expected',
              type: 'line',
              data: [1, 22, 3, 4, 1, 0, 88]
            },
            {
              name: 'actual',
              type: 'line',
              data: [121, 21, 5, 1, 1, 1, 85]
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    setOptions (options) {
      this.chart.setOption(options, true)
    }
  }
}
</script>


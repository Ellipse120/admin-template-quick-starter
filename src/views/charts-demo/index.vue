<template>
  <div class="px-3">
    <div class="flex justify-center">
      <el-button v-for="item in sections" :key="item" @click="goTo(item)">{{ item }}</el-button>

      <el-popover placement="bottom" width="600" trigger="hover">
        <div class="m-2">
          <label>过去{{ nYear }}年</label>
          <el-input-number v-model="nYear" controls label="过去N年" />
        </div>
        <div class="m-2">
          <label>部门</label>
          <el-checkbox-group v-model="selectedDepts">
            <el-checkbox v-for="item in depts" :key="item" :label="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button slot="reference" type="success" icon="el-icon-setting" class="ml-2" />
      </el-popover>
    </div>

    <div class="overflow-y-auto h-full">
      <div v-for="item in mockChartData" :key="'统计分析' + item.name" :ref="item.name" class="flex">
        <el-card style="width: 50vw;" class="my-2 mr-2" shadow="hover">
          <div slot="header">历年各单位<span class="text-red-600">{{ item.name }}</span>数量统计</div>
          <e-charts-wrapper :key="genUUIDMixin()" :chart-data="item.lineChartData" />
        </el-card>
        <el-card style="width: 50vw;" class="my-2" shadow="hover">
          <div slot="header">{{ thisYear }}年各单位<span class="text-red-600">{{ item.name }}</span>修订情况</div>
          <e-charts-wrapper :key="genUUIDMixin()" :chart-data="item.barChartData" />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { eachYearOfInterval, subYears } from 'date-fns'
import random from 'lodash/random'
import EChartsWrapper from '@/components/EChartsWrapper'

export default {
  name: 'ChartsDemo',
  components: {
    EChartsWrapper
  },
  data () {
    return {
      nYear: 11,
      selectedDepts: [],
      thisYear: new Date().getFullYear(),
      depts: ['车辆部', '上海动车段', '南京动车段', '南京东动车段', '杭州北动车段', '合肥车辆段'],
      sections: ['技术规章', '管理制度', '通知纪要', '作业标准（指导书）', '解读材料'],
      barLegends: ['计划', '实际完成']
    }
  },
  computed: {
    mockChartData () {
      return this.sections.map(o => {
        return {
          name: o,
          lineChartData: this.generateLineChartData(this.selectedDepts),
          barChartData: this.generateBarChartData(this.selectedDepts, this.barLegends)
        }
      })
    }
  },
  created () {
    this.selectedDepts = this.depts
  },
  methods: {
    async goTo (name) {
      const el = this.$refs[name][0]
      await this.$nextTick()
      el && el.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    },

    generateLineChartData (depts) {
      return {
        xAxis: {
          data: this.lastNYear(this.nYear),
          boundaryGap: true
        },
        grid: {
          left: 10,
          right: 30,
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
          data: depts
        },
        series: depts.map(d => ({
          name: d,
          type: 'line',
          symbol: 'triangle',
          symbolSize: 14,
          data: Array.from({ length: this.lastNYear(this.nYear).length }).map((_, index) => random(index, 100))
        }))
      }
    },

    generateBarChartData (depts, barLegends) {
      return {
        xAxis: {
          data: depts,
          boundaryGap: true
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: 10,
          right: 30,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: barLegends
        },
        series: barLegends.map(o => ({
          name: o,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
          data: Array.from({ length: depts.length }, (_, index) => random(index * random(index, index + 10), 100))
        }))
      }
    },

    /**
     * 过去N年
     * @param n
     * @returns {number[]} Ex: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
     */
    lastNYear (n = 11) {
      const today = new Date()
      const nYearAgo = subYears(today, n)
      const lastNYears = eachYearOfInterval({ start: nYearAgo, end: today })
      return lastNYears.map(o => o.getFullYear())
    }
  }
}
</script>

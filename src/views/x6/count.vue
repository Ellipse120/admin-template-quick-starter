<template>
  <div>
    <el-alert>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cum delectus dolore dolorem, error harum inventore ipsam laboriosam natus nemo neque nesciunt, officia praesentium provident quia reprehenderit, rerum sed veniam.</el-alert>
    <el-button @click="add()">内部Add: {{ num }} </el-button>
  </div>
</template>

<script>
import '@antv/x6-vue-shape'

export default {
  name: 'Count',
  inject: ['getGraph', 'getNode'],
  data () {
    return {
      num: 0
    }
  },
  mounted () {
    const graph = this.getGraph()
    // 监听数据改变事件
    graph.on('node:change:data', ({ current }) => {
      this.num = current.num
    })
  },
  methods: {
    add () {
      const node = this.getNode()
      const { num } = node.getData()
      node.setData({
        num: num + 1
      })
    }
  }
}
</script>

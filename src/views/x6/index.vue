<template>
  <div>
    <div id="x6-wrapper" />
    <el-button type="success" @click="add">外部 Add</el-button>
  </div>
</template>

<script>
import { Graph } from '@antv/x6'
import '@antv/x6-vue-shape'
import Count from './count'

let graph = null

const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello' // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world' // String，节点标签
    }
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2' // String，必须，目标节点 id
    }
  ]
}

export default {
  name: 'X6',
  mounted () {
    graph = new Graph({
      container: document.getElementById('x6-wrapper'),
      width: 600,
      height: 400,
      grid: true
    })

    graph.fromJSON(data)

    // 注册 vue component
    // 如果需要序列化/反序列化数据，必须使用该方式
    Graph.registerVueComponent(
      'count',
      {
        template: `<Count />`,
        components: {
          Count
        }
      },
      true
    )

    graph.addNode({
      id: '1',
      shape: 'vue-shape',
      x: 200,
      y: 150,
      width: 150,
      height: 100,
      component: 'count',
      data: {
        num: 0
      }
    })
  },
  methods: {
    add () {
      const node = graph.getCellById('1')
      if (node) {
        const { num } = node.getData()
        node.setData({
          num: num + 1
        })
      }
    }
  }
}
</script>

<style scoped>

</style>

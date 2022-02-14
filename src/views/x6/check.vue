<template>
  <div class="h-full flex items-center" style="justify-content: flex-end;">
    <el-dropdown @command="handleCommand">
      <el-button icon="el-icon-more" style="padding: 5px; margin-right: 3px;" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in selectList" :key="item.key" :command="item.key">{{ item.value }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import '@antv/x6-vue-shape'

export default {
  name: 'Check',
  inject: ['getGraph', 'getNode'],
  data () {
    return {
      selectList: [{
        key: '1',
        value: '添加附属属性'
      }, {
        key: '2',
        value: '分解部件'
      }],
      selectValue: null
    }
  },
  mounted () {

  },
  methods: {
    handleCommand (command) {
      this.selectValue = command
      console.log(this.selectValue)
    }
  }
}
</script>

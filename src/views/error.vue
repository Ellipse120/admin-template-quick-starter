<template>
  <div>
    <el-card>
      <div slot="header">提醒</div>
      <el-alert type="error">获取模块失败，<el-button type="text" @click="doReloadPage">点我</el-button>刷新页面</el-alert>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Error',
  methods: {
    doReloadPage () {
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>

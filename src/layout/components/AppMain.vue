<template>
  <section class="app-main">
    <router-view :key="key" />
    <el-backtop target=".app-main" :right="10" />
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*46 = navbar  */
  /*30 = breadcrumb  */
  height: calc(100vh - 92px);
  width: 100%;
  overflow: auto;
  padding: 0 14px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>


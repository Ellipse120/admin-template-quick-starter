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
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>


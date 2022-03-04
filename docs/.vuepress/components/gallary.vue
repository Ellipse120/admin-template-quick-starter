<template>
  <div class="gallary">
    <div>
      <div v-for="(item, index) in list" :key="index">
        <img :src="$withBase('/assets/imgs/' + item)" :alt="item" class="item">
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'gallary',
  data () {
    return {
      list: [
        'layoutOfVertical.png',
        'layoutOfHorizontal.png',
        'code-generator.gif',
        'antX6-flow.png',
        'antX6.png',
        'echarts.png',
        'tinymce.png',
        'mirageJS-Mock-API.png',
      ]
    }
  }
}
</script>

<style scoped>
.item {
  marge: 1rem;
  border-bottom: 2px solid rgb(0, 255, 179);
}
</style>
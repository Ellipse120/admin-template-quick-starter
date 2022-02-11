<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <el-link><i class="hamburger" :class="isActive ? 'el-icon-s-fold' : 'el-icon-s-unfold'" /></el-link>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  font-size: 21px;
}

.hamburger:hover {
  cursor: pointer;
}
</style>

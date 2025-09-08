<template>
  <div class="p-2.5" @click="toggleClick">
    <el-link><i class="inline text-4xl cursor-pointer" :class="isActive ? 'el-icon-s-fold' : 'el-icon-s-unfold'" /></el-link>
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


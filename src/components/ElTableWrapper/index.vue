<template>
  <el-table
    :height="height"
    :border="border"
    :stripe="stripe"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />

    <template slot="empty">
      <el-empty />
    </template>
  </el-table>
</template>

<script>
export default {
  name: 'ElTableWrapper',
  props: {
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    height: {
      type: [String, Number],
      default: '100%'
    }
  }
}
</script>

<style scoped>

</style>

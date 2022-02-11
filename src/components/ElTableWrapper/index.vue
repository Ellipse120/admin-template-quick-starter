<template>
  <el-table
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
    }
  }
}
</script>

<style scoped>

</style>

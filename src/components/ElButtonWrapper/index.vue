<template>
  <el-button
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span>
      <slot />
      <slot name="custom" />
    </span>
  </el-button>
</template>

<script>
/**
 * @description **按钮组件**
 */
export default {
  name: 'ElButtonWrapper'
}
</script>

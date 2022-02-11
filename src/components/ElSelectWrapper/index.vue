<template>
  <el-select
    v-model="val"
    clearable
    filterable
    default-first-option
    class="full-width"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option v-for="item in options" :key="item.key" :value="item.key" :label="item.value">
      <slot />
      <slot name="custom" />
    </el-option>
  </el-select>
</template>

<script>
/**
 * @description **下拉框组件**
 */
export default {
  name: 'ElSelectWrapper',
  props: {
    value: {
      type: [Array, String, Number],
      default () {
        return null
      }
    },
    /**
     * @description Key Value 对象数组
     * @example [{ key: 'x', value: 'xxx' }, { key: 'y', value: 'yyy' }]
     */
    options: {
      type: [Array, String],
      default () {
        return []
      }
    }
  },
  data () {
    return {
      val: null
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.val = val
      },
      immediate: true
    }
  }
}
</script>

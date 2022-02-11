<template>
  <el-date-picker
    v-model="val"
    clearable
    class="full-width"
    value-format="timestamp"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
/**
 * @description **时间选择器组件**, 默认时间格式为时间戳
 */
export default {
  name: 'ElDatePickerWrapper',
  props: {
    value: {
      type: [Date, String, Number, Array],
      default () {
        return new Date().getTime()
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

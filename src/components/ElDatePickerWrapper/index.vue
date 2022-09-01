<template>
  <el-date-picker
    v-model="val"
    clearable
    class="full-width"
    value-format="timestamp"
    :placeholder="`请选择${title}`"
    :title="title"
    :default-time="defaultTime"
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
    },
    title: {
      type: [String],
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      val: null
    }
  },
  computed: {
    defaultTime () {
      const defaultTimes = this.$attrs?.['default-time']
      if (defaultTimes?.length) {
        return defaultTimes
      }

      return this.$attrs?.type?.includes('range') ? ['00:00:00', '23:59:59'] : null
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

<template>
  <el-input
    v-model="val"
    clearable
    :placeholder="`请输入${title}`"
    class="w-full"
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(_, name) in $slots" #[name]>
      <slot :name="name" />
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'ElInputWrapper',
  props: {
    value: {
      type: [String, Number],
      default: () => null
    },
    title: {
      type: [String],
      default: () => ''
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

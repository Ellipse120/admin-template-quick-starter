<template>
  <div>
    <el-select
      v-model="val"
      clearable
      filterable
      default-first-option
      class="full-width"
      v-bind="$attrs"
      :filter-method="customFilter"
      v-on="$listeners"
    >
      <recycle-scroller v-slot="{ item }" class="h-200px overflow-y-auto w-full" :items="organizationsList" :item-size="32" key-field="key">
        <el-option :key="item.key" :value="item.key" :label="item.value">
          <slot :data="item" />
        </el-option>
      </recycle-scroller>
    </el-select>
  </div>
</template>

<script>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { RecycleScroller } from 'vue-virtual-scroller'

export default {
  name: 'VirtualScrollerWrapper',
  components: { RecycleScroller },
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
      val: null,
      organizationsList: []
    }
  },
  watch: {
    value: {
      handler: function (val) {
        this.setDefaultValue(val)
        this.val = val
      },
      immediate: true
    },
    options: {
      handler: function (val) {
        this.organizationsList = val
      },
      immediate: true
    }
  },
  methods: {
    customFilter (v) {
      if (!v) {
        this.organizationsList = [...this.options]
      }
      this.organizationsList = [...this.options].filter(o => {
        return o.value.includes(v)
      })
    },
    setDefaultValue (key) {
      const index = this.organizationsList.findIndex(i => i.key === key)
      const item = this.organizationsList.splice(index, 1)[0]
      this.organizationsList.unshift(item)
    }
  }
}
</script>


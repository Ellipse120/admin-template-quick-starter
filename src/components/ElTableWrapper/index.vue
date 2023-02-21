<template>
  <el-table
    ref="elTableRef"
    :height="height"
    :border="border"
    :stripe="stripe"
    :header-cell-class-name="setFixedColumnsClass"
    title="Click table header to frozen this column and columns on the left"
    v-bind="$attrs"
    @header-click="toggleFixedColumns"
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
  },
  data () {
    return {
      isFixed: false, // toggle fixed state
      fixedColumnIndex: null // column index of target column
    }
  },
  methods: {
    setFixedColumnsClass ({ columnIndex }) {
      if (this.isFixed && (columnIndex <= this.fixedColumnIndex)) {
        return 'cursor-pointer !bg-red-200 !text-white'
      }

      return 'cursor-pointer'
    },

    toggleFixedColumns (column) {
      this.isFixed = !this.isFixed
      const columnValue = column.label
      const elTableRef = this.$refs['elTableRef']

      this.fixedColumnIndex = elTableRef.store.states._columns.findIndex(c => {
        const cValue = c.label

        return cValue === columnValue
      })

      elTableRef.store.states._columns.forEach((c, index) => {
        if (index <= this.fixedColumnIndex) {
          c.fixed = this.fixed
        }
      })

      elTableRef.store.updateColumns()
      elTableRef.doLayout()
    }
  }
}
</script>

<style scoped>

</style>

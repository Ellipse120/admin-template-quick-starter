import isFunction from 'lodash/isFunction'

/**
 * @description使用方式
 *
 * 后端接口返回支持排序字段，前端为el-table添加custom查询函数
 *
 * 1. 设置table的ref为searchTable；
 * 2. 引入本mixin；
 * 3. 使用addCustomSortable函数.
 */
export default {
  data () {
    return {
      elTableRef: null,
      tableHeaderRef: null,
      tableColumns: null,
      sortFields: {},
      sortableProp: [],
      query: {
        sortFields: null,
        sortDirs: null
      },
      getListAlias: null // 查询函数别名，没有使用`getList`时，在自己模块中使用该别名。Ex: `this.getListAlias = this.getList222`
    }
  },
  mounted () {
    const isElTableWrapper = this.$refs['searchTable'].$options.name === 'ElTableWrapper'
    this.elTableRef = isElTableWrapper ? this.$refs['searchTable']?.$children?.[0] : this.$refs['searchTable']
    this.tableHeaderRef = this.elTableRef?.$refs['tableHeader']
    this.tableColumns = this.tableHeaderRef?.columns
    this.elTableRef.$on('sort-change', this.sortData)
  },
  methods: {
    addCustomSortable (data) {
      if (!data?.supportedSorts) return
      if (!this.tableHeaderRef) return
      this.sortableProp = data?.supportedSorts
      this.tableHeaderRef.store.states.columns = this.tableColumns?.map(o => {
        if (this.sortableProp.includes(o.property)) {
          o.sortable = 'custom'
        }
        return o
      })
    },

    sortData ({ prop, order }) {
      const orderMap = {
        'ascending': 'asc',
        'descending': 'desc'
      }

      if (order) {
        this.sortFields = {
          ...this.sortFields,
          [prop]: orderMap[order]
        }
      } else {
        // eslint-disable-next-line no-unused-vars
        const { [prop]: _noUsedVars, ...restFields } = this.sortFields
        this.sortFields = restFields
      }
      this.query.sortFields = Object.keys(this.sortFields).toString()
      this.query.sortDirs = Object.values(this.sortFields).toString()
      isFunction(this.getList) && this.getList()
      this.getListAlias && console.assert(isFunction(this.getListAlias), `getListAlias must be a function`)
      isFunction(this.getListAlias) && this.getListAlias()
    }
  }
}

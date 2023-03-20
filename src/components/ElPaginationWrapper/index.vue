<template>
  <el-pagination
    :current-page="pagination.pageNo"
    :page-size="pagination.pageSize"
    :page-sizes="[5, 20, 100]"
    :total="pagination.total"
    layout="total, slot, ->, prev, pager, next, sizes, jumper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span class="text-el-gray-300 font-normal">第 {{ pagination.pageNo }} / {{ pageCount }}</span>
  </el-pagination>
</template>

<script>
export default {
  name: 'ElPaginationWrapper',
  props: {
    pagination: {
      type: Object,
      default () {
        return {
          pageNo: 1,
          pageSize: 20,
          total: 0
        }
      }
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.pagination.total / this.pagination.pageSize) || 1
    }
  }
}
</script>

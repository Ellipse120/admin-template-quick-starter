<template>
  <el-select
    v-model="valData"
    filterable
    clearable
    default-first-option
    placeholder="请输入名字搜索"
    remote
    :remote-method="queryData"
    :loading="isLoading"
    v-bind="$attrs"
    @change="handleSelect"
    v-on="$listeners"
  >
    <el-option v-for="item in users" :key="item.id" :value="item.id" :label="item.username">
      <div class="w-20">{{ item.username }}【{{ item.departmentModel && item.departmentModel.departmentName }}】</div>
    </el-option>
  </el-select>
</template>

<script>
/**
 * @description 模糊搜索用户组件. 如果需要获取用户对象数据，可监听事件`selected-item`
 * @example ```vue
 *   // html
 *   <user-selector v-model="row.responseUserId" @selected-item="(val) => handleSelect(val, row, $index)" />

    // js
    handleSelect (val, row, $index) {
      this.$set(row, 'responseUserDeptName', val?.departmentModel?.departmentName)
    },
 * ```
 */
import debounce from 'lodash/debounce'
import { getUsers } from '@/api/common'

export default {
  name: 'UserSelector',
  // eslint-disable-next-line vue/require-prop-types
  props: ['value', 'initVal'],
  data () {
    return {
      valData: null,
      isLoading: false,
      users: []
    }
  },
  watch: {
    value: {
      handler: function (v) {
        this.valData = v
        v && (this.users = [{ id: v, username: this.initVal }])
      },
      immediate: true
    }
  },
  methods: {
    queryData: debounce(async function (str) {
      this.users = []
      this.isLoading = true
      const { data } = await getUsers({
        username: str
      }).finally(() => {
        this.isLoading = false
      })

      this.users = data?.list.map(o => ({
        ...o,
        value: o.id
      }))
    }, 500),

    handleSelect () {
      const selectedItem = this.users.find(u => u.id === this.valData)
      this.$emit('selected-item', selectedItem)
    }
  }
}
</script>

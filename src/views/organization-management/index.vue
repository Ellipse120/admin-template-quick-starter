<template>
  <div>
    <el-row :gutter="10" type="flex" align="space-between" class="mb-2">
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-model="query.organCode" clearable placeholder="请输入组织代码" title="组织代码" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-model="query.organName" clearable placeholder="请输入组织名称" title="组织名称" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4">
        <el-button icon="el-icon-close" @click="resetQuery">清空</el-button>
        <el-button type="primary" icon="el-icon-search" :loading="isLoading" @click="doSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="doAdd">添加</el-button>
      </el-col>
    </el-row>

    <el-table-wrapper
      ref="searchTable"
      v-loading="isLoading"
      class="mb-2"
      :height="tableHeight"
      :data="list"
      :cell-class-name="decideTableCellCSSClassNames"
    >
      <el-table-column label="序号" type="index" align="center" width="60" />
      <el-table-column label="部门代码" prop="departmentCode" align="center" />
      <el-table-column label="部门名称" prop="departmentName" align="center" />
      <el-table-column label="部门简称" prop="nameEn" align="center" />
      <el-table-column label="组织类型" prop="organType" align="center" />
      <el-table-column label="上级组织" prop="parentName" align="center" />
      <el-table-column label="状态" prop="ifOpen" align="center" />
      <el-table-column type="expand" label="详情">
        <template slot-scope="{ row }">
          <el-descriptions :column="4">
            <el-descriptions-item label="创建人">{{ row.createBy }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ formatTimeMixin(row.createTime) }}</el-descriptions-item>
            <el-descriptions-item label="更新人">{{ row.updateBy }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ formatTimeMixin(row.updateTime) }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ row.remark }}</el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button-wrapper type="text" icon="el-icon-edit" @click="doEdit(scope)">编辑</el-button-wrapper>
          <el-button-wrapper type="text" icon="el-icon-delete" @click="doRemove(scope)">删除</el-button-wrapper>
        </template>
      </el-table-column>
    </el-table-wrapper>

    <el-pagination
      :current-page="pagination.pageNo"
      :page-sizes="[10, 20, 100]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.totalRecords"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      :title="isAdd ? '添加' : '编辑'"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" v-loading="isLoadingOrganInfo" :model="model" :rules="rules" label-width="120px">
        <el-form-item label="部门代码" prop="departmentCode">
          <el-input v-model="model.departmentCode" :disabled="!isAdd" clearable />
        </el-form-item>
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="model.departmentName" clearable />
        </el-form-item>
        <el-form-item label="部门简称" prop="nameEn">
          <el-input v-model="model.nameEn" clearable />
        </el-form-item>
        <el-form-item label="部门类型">
          <el-input v-model="model.organType" clearable />
        </el-form-item>
        <el-form-item label="上级组织">
          <el-select v-model="model.parentCode" clearable filterable class="full-width">
            <el-option v-for="(item, index) in allOrganizations" :key="index" :value="item.key" :label="item.value">
              <div class="flex items-center justify-between">
                <div>{{ item.value }}</div>
                <div><b>&nbsp;【上级：{{ item.ext.parentName }}】</b></div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="doSave">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="dataPermissionDialogTitle"
      :visible.sync="permissionDataDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="text-2xl text-center">Todo...</div>
      <div slot="footer">
        <el-button type="primary" @click="doSavaPermissionData">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { list, detail, add, modify, remove, trainKVList } from './api'
import { getAllOrganizations } from '@/api/common'
import autoTableHeight from '@/mixins/autoTableHeight'
import { setDataPermission } from '@/views/organization-management/api'
import ElButtonWrapper from '@/components/ElButtonWrapper'
import ElTableWrapper from '@/components/ElTableWrapper'

export default {
  name: 'OrganizationManagement',
  components: { ElButtonWrapper, ElTableWrapper },
  mixins: [autoTableHeight],
  data () {
    return {
      query: {
        bureauName: null,
        organCode: null,
        organName: null
      },
      defaultQuery: {
        bureauName: null,
        organCode: null,
        organName: null
      },
      pagination: {
        pageNo: 1,
        pageSize: 20,
        totalRecords: 0
      },
      isAdd: false,
      dialogVisible: false,
      permissionDataDialogVisible: false,
      isLoading: false,
      isLoadingOrganInfo: false,
      list: [],
      model: {
        createBy: null,
        createTime: null,
        dataPermList: null,
        deleted: null,
        departmentCode: null,
        departmentName: null,
        id: null,
        nameEn: null,
        orderNum: null,
        organType: null,
        parentCode: null,
        parentName: null,
        path: null,
        remark: null,
        subOrganList: null,
        updateBy: null,
        updateTime: null
      },
      defaultModel: {
        createBy: null,
        createTime: null,
        dataPermList: null,
        deleted: null,
        departmentCode: null,
        departmentName: null,
        id: null,
        nameEn: null,
        orderNum: null,
        organType: null,
        parentCode: null,
        parentName: null,
        path: null,
        remark: null,
        subOrganList: null,
        updateBy: null,
        updateTime: null
      },
      rules: {
        departmentCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        bureauName: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      allTrainKV: [],
      allOrganizations: [],
      selectedTrainId: [],
      currentId: null,
      dataPermissionDialogTitle: null
    }
  },
  watch: {
    '$route': {
      handler: 'getList',
      immediate: true
    }
  },
  created () {
    // this.getAllTrainKV()
  },
  methods: {
    doSearch () {
      this.pagination.pageNo = 1
      this.getList()
    },

    async getList () {
      this.isLoading = true
      const query = { ...this.query, ...this.pagination }
      const { data } = await list(query).finally(() => {
        this.isLoading = false
      })
      this.list = data?.list
      this.pagination = data?.pageReq
    },

    async doSavaPermissionData () {
      if (!this.selectedTrainId.length) {
        this.$notify({
          type: 'warning',
          title: '提醒',
          message: '请选择要配置权限的车组'
        })
        return
      }
      if (!this.currentId) {
        return
      }

      const dataType = 'TRAIN_ID'
      const d = {
        id: this.currentId,
        data: {
          dataPerms: this.selectedTrainId.map(o => ({
            dataId: o,
            dataType: dataType
          }))
        }
      }
      await setDataPermission(d)
      this.togglePermissionDataDialogVisible(false)
      this.$message.success('配置成功')
      this.selectedTrainId = []
      this.getList()
    },

    togglePermissionDataDialogVisible (v) {
      this.permissionDataDialogVisible = v
    },

    async doAdd () {
      this.isAdd = true
      this.model = cloneDeep(this.defaultModel)
      this.dialogVisible = true
      await this.getAllOrganizationData()
    },

    async doEdit ({ row: { id }}) {
      this.isAdd = false
      const { data } = await detail(id, { includeSub: false })
      this.model = data
      this.dialogVisible = true
      await this.getAllOrganizationData()
    },

    doSave () {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const data = cloneDeep(this.model)
          if (this.isAdd) {
            await add(data)
            this.dialogVisible = false
            this.$message.success('添加成功')
            await this.getList()
          } else {
            await modify(data)
            this.dialogVisible = false
            this.$message.success('编辑成功')
            await this.getList()
          }
        }
      })
    },

    doRemove ({ row }) {
      this.$confirm(`确认删除 ${row.departmentName}【${row.departmentCode}】？`, '提醒', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove(row.id)
        this.$message.success('删除成功')
        await this.getList()
      }).catch(() => {})
    },

    handleCurrentChange (currentPage) {
      this.pagination.pageNo = currentPage
      this.getList()
    },

    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.getList()
    },

    resetQuery () {
      this.query = cloneDeep(this.defaultQuery)
    },

    async getEnums () {
      // const param1 = 'Userconfigkeys'
      // const { data } = await getDiffTypeDictList([param1].toString())
      // this.configKeies = data[param1]
    },

    async getAllTrainKV () {
      const { data } = await trainKVList()
      this.allTrainKV = data
    },

    async getAllOrganizationData () {
      this.isLoadingOrganInfo = true
      const { data } = await getAllOrganizations().finally(() => {
        this.isLoadingOrganInfo = false
      })
      this.allOrganizations = data
    },

    decideTableCellCSSClassNames ({ row, column }) {
      const cssClassNames = []
      const columnLabel = column.label

      if (columnLabel === '组织类型') {
        cssClassNames.push('has-corner-triangular-mark')
        cssClassNames.push('triangular-mark-is-small')

        const dict = {
          '部': 'is-bu',
          '局': 'is-ju',
          '段': 'is-duan',
          '所': 'is-suo',
          '车间': 'is-workroom'
        }

        const ccn = dict[row.organType] || ''
        if (ccn) { cssClassNames.push(ccn) }
      }

      return cssClassNames.join(' ')
    }
  }
}
</script>

<style scoped>
.fill-back-transfer {
  display: flex;
  align-items: center;
  height: 50vh;
}
</style>

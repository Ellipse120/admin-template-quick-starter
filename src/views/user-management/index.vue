<template>
  <div>
    <el-row :gutter="10" type="flex" align="space-between" class="mb-2">
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-model="query.loginName" clearable placeholder="请输入登录名" title="登录名" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-model="query.username" clearable placeholder="请输入用户名" title="用户名" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-model="query.email" clearable placeholder="请输入邮箱" title="邮箱" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-model="query.mobile" clearable placeholder="请输入手机号" title="手机号" />
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
    >
      <el-table-column type="index" label="序号" align="center" width="80" />
      <el-table-column label="用户ID" prop="id" align="center" />
      <el-table-column label="登陆名" prop="loginName" align="center" />
      <el-table-column label="用户名" prop="username" align="center" />
      <el-table-column label="部门" prop="departmentName" align="center" min-width="130" />
      <el-table-column prop="roleKvs" align="center" label="角色" min-width="220">
        <template slot-scope="{ row }">
          {{ row.roleKvs ? row.roleKvs.map(o => o.value).toString() : '' }}
        </template>
      </el-table-column>

      <el-table-column label="邮箱" prop="email" align="center" />
      <el-table-column label="电话" prop="mobile" align="center" />
      <el-table-column type="expand" label="详情" align="center" width="80">
        <template slot-scope="{ row }">
          <el-descriptions :column="4" class="px-4">
            <el-descriptions-item label="创建人">{{ row.createBy }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ formatTimeMixin(row.createTime) }}</el-descriptions-item>
            <el-descriptions-item label="更新人">{{ row.updateBy }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ formatTimeMixin(row.updateTime) }}</el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <operation-btn-groups :btn-count="1">
            <el-button-wrapper type="text" icon="el-icon-user" @click="doSetRole(scope)">配置角色</el-button-wrapper>
            <el-button-wrapper type="text" icon="el-icon-edit" @click="doEdit(scope)">编辑</el-button-wrapper>
            <el-button-wrapper type="text" icon="el-icon-warning" @click="doResetPassword(scope)">重置密码</el-button-wrapper>
            <el-button-wrapper type="text" icon="el-icon-delete" @click="doRemove(scope)">删除</el-button-wrapper>
          </operation-btn-groups>
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
      <el-form ref="form" :model="model" :rules="rules" label-width="120px">
        <el-form-item label="登陆名" prop="loginName">
          <el-input v-model="model.loginName" clearable />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username" clearable />
        </el-form-item>
        <el-form-item v-if="isAdd" label="密码" prop="password">
          <el-input v-model="model.password" clearable />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="model.email" clearable />
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="model.mobile" clearable />
        </el-form-item>
        <el-form-item label="部门" prop="departmentId">
          <el-select v-model="model.departmentId" class="w-full" clearable filterable>
            <el-option v-for="(t, index) in allOrganizations" :key="'organ' + index" :label="t.departmentName" :value="t.id">{{ t.departmentName }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子部门" prop="subDepart">
          <el-input v-model="model.subDepart" clearable />
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="doSave">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="dataRoleOfUserTitle"
      :visible.sync="roleOfUserVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <el-checkbox v-model="checkAllRoles" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="selectedRoles" @change="handleCheckedRolesChange">
          <el-checkbox v-for="(t, index) in allRoles" :key="index" :label="t.id"><span class="mr-5">{{ t.roleName }}</span><el-tag v-if="t.remark">{{ t.remark }}</el-tag></el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="doSavaRoleOfUser">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { list, detail, add, modify, remove, setRoles, resetPassword, organList as getAllOrganization } from './api'
import { passwordPattern, passwordInvalidMessage } from '@/project-config'
import autoTableHeight from '@/mixins/autoTableHeight'
import { allRoles } from '@/views/menu-management/api'
import ElTableWrapper from '@/components/ElTableWrapper'
import ElButtonWrapper from '@/components/ElButtonWrapper'
import OperationBtnGroups from '@/components/OperationsWrapper'

export default {
  name: 'UserManagement',
  components: { OperationBtnGroups, ElButtonWrapper, ElTableWrapper },
  mixins: [autoTableHeight],
  data () {
    return {
      query: {
        loginName: null,
        username: null,
        email: null,
        mobile: null
      },
      defaultQuery: {
        loginName: null,
        username: null,
        email: null,
        mobile: null
      },
      pagination: {
        pageNo: 1,
        pageSize: 20,
        totalRecords: 0
      },
      isAdd: false,
      dialogVisible: false,
      isLoading: false,
      list: [],
      model: {
        captcha: null,
        createBy: null,
        createTime: null,
        dataPermList: null,
        deleted: null,
        departmentId: null,
        email: null,
        id: null,
        loginName: null,
        menuList: null,
        mobile: null,
        newPassword: null,
        password: null,
        roleList: null,
        salt: null,
        status: null,
        updateBy: null,
        updateTime: null,
        username: null,
        subDepart: null
      },
      defaultModel: {
        captcha: null,
        createBy: null,
        createTime: null,
        dataPermList: null,
        deleted: null,
        departmentId: null,
        email: null,
        id: null,
        loginName: null,
        menuList: null,
        mobile: null,
        newPassword: null,
        password: null,
        roleList: null,
        salt: null,
        status: null,
        updateBy: null,
        updateTime: null,
        username: null,
        subDepart: null
      },
      rules: {
        loginName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        username: [{ required: true, message: '不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '不能为空', trigger: 'blur' }],
        departmentId: [{ required: true, message: '不能为空', trigger: 'change' }]
      },
      dataRoleOfUserTitle: null,
      roleOfUserVisible: false,
      currentId: null,
      allRoles: [],
      selectedRoles: [],
      checkAllRoles: false,
      allOrganizations: [],
      userId: null
    }
  },
  watch: {
    '$route': {
      handler: 'getList',
      immediate: true
    }
  },
  created () {
    this.getAllOrgan()
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

    doAdd () {
      this.isAdd = true
      this.model = cloneDeep(this.defaultModel)
      this.dialogVisible = true
    },

    async doSetRole (scope) {
      this.dataRoleOfUserTitle = `配置用户【${scope.row.loginName}】角色`
      this.currentId = scope.row.id
      this.isLoading = true
      const userDetail = await detail(this.currentId)
      this.selectedRoles = userDetail?.data?.roleKvs?.map(o => o.key - 0)
      const { data } = await allRoles().finally(() => {
        this.isLoading = false
      })
      this.allRoles = data
      this.toggleRoleOfUserDialogVisible(true)
    },

    async doSavaRoleOfUser () {
      if (this.selectedRoles.length === 0) {
        this.$message.warning('请选择角色')
        return
      }
      const d = {
        id: this.currentId,
        data: {
          roleIdList: this.selectedRoles
        }
      }
      await setRoles(d)
      this.$message.success('配置成功')
      await this.getList()
      this.toggleRoleOfUserDialogVisible(false)
    },

    toggleRoleOfUserDialogVisible (v) {
      this.roleOfUserVisible = v
    },

    doResetPassword (scope) {
      this.userId = scope.row.id

      this.$prompt(`请输入【 ${scope.row.loginName}】重置后密码`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: passwordPattern,
        inputErrorMessage: passwordInvalidMessage,
        closeOnPressEscape: false,
        closeOnClickModal: false
      })
        .then(async (data) => {
          if (data.value === null) {
            this.$message({
              type: 'info',
              message: '请输入密码'
            })
            return
          }
          const d = {
            userId: this.userId,
            newPassword: data.value
          }
          await resetPassword(d)

          this.$message({
            type: 'success',
            message: '重置成功'
          })
        })
        .catch(() => {})
    },

    handleCheckAllChange (value) {
      this.selectedRoles = value ? this.allRoles.map(o => o.id) : []
    },

    handleCheckedRolesChange (value) {
      const checkedCount = value.length
      this.checkAllRoles = checkedCount === this.allRoles.length
    },

    async doEdit ({ row }) {
      this.isAdd = false
      const { data } = await detail(row.id)
      this.model = data
      this.dialogVisible = true
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
      this.$confirm(`确认删除 【${row.loginName}】？`, '提醒', {
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

    async getAllOrgan () {
      const { data } = await getAllOrganization({
        pageNo: 1,
        pageSize: 1000
      })
      this.allOrganizations = data?.list
    }
  }
}
</script>

<style lang="scss">
.page-content--user-management {

  .el-table__expanded-cell {
    padding: 0.5rem 2rem 0;
  }

  tbody {

    // .cell--user-id,
    .cell--user-name,
    .cell--user-display-name,
    .cell--department {
      color: black;
      text-shadow: 0 0 0.05rem rgba(black, 0.319);
    }

    .cell--operations {

      .el-button {
        margin: 0 0.25rem;
      }

      hr {
        display: inline-block;
        border: none;
        width: 1.5rem;
        height: 1rem;
        margin: 0;
      }

      .el-link {
        margin: 0 0.25rem;
      }
    }
  }

  .table-row-details-list {
    float: left;
    margin: 0 1rem 1rem 4rem;

    &.list-narrow {
      width: 16rem;
      max-width: calc(100% - 5rem);
    }

    &.list-wide {
      width: 32rem;
      margin-right: 1rem;
      max-width: calc(100% - 2rem);
    }

    .el-form-item {
      margin: 0;

      .el-form-item__label,
      .el-form-item__content {
        line-height: 1.4rem;
      }
    }

    label {
      // text-align: right;
      width: 3.2rem;
      padding: 0;
      font-weight: normal;
      color: #999;
    }

    .el-form-item__content {
      padding-left: 3.5rem;
      color: black;
      text-shadow: 0 0 0.1rem rgba(black, 0.219);
    }
  }
}
</style>

<template>
  <div>
    <el-row :gutter="10" type="flex" align="space-between" class="mb-2">
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-model="query.menuCodes" clearable placeholder="请输入菜单代码" title="菜单代码" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-input v-model="query.menuName" clearable placeholder="请输入菜单名称" title="菜单名称" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <el-button icon="el-icon-close" @click="resetQuery">清空</el-button>
        <el-button type="primary" icon="el-icon-search" :loading="isLoading" @click="doSearch">查询</el-button>
        <el-button type="success" icon="el-icon-plus" @click="doAdd">添加</el-button>
        <el-button type="warning" icon="el-icon-setting" @click="doSetMenu">角色配置菜单</el-button>
      </el-col>
    </el-row>

    <el-table-wrapper
      ref="searchTable"
      v-loading="isLoading"
      class="mb-2"
      :height="tableHeight"
      :data="list"
    >
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="50"
      />
      <el-table-column
        prop="id"
        align="center"
        label="菜单ID"
        width="60"
      />
      <el-table-column
        prop="menuCode"
        align="center"
        label="菜单代码"
        min-width="280"
        class-name="col--color-green cell--menu-id"
      />
      <el-table-column
        prop="menuEnName"
        align="center"
        label="菜单英文名称"
        min-width="120"
        class-name="cell--english-name"
      />
      <el-table-column
        prop="menuName"
        align="center"
        label="菜单名称"
        min-width="480"
        class-name="col--color-cyan cell--menu-name"
      />
      <el-table-column
        prop="menuType"
        align="center"
        label="菜单类型"
        width="70"
      />
      <el-table-column
        prop="parentId"
        align="center"
        label="上级菜单"
        width="90"
      />

      <el-table-column type="expand" label="详情">
        <template slot-scope="{ row }">
          <el-form label-position="left" class="table-row-details-list list-narrow">
            <el-form-item label="创建人"><span>{{ row.createBy }}</span></el-form-item>
            <el-form-item label="创建时间"><span>{{ formatDate(row.createTime) }}</span></el-form-item>
          </el-form>
          <el-form label-position="left" class="table-row-details-list list-narrow">
            <el-form-item label="更新人"><span>{{ row.updateBy }}</span></el-form-item>
            <el-form-item label="更新时间"><span>{{ formatDate(row.updateTime) }}</span></el-form-item>
          </el-form>
          <el-form label-position="left" class="table-row-details-list list-wide">
            <el-form-item label="授权"><span>{{ row.perms }}</span></el-form-item>
            <el-form-item label="备注"><span>{{ row.remark }}</span></el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="doEdit(scope)">编辑</el-button>
          <el-button type="danger" @click="doRemove(scope)">删除</el-button>
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
        <el-form-item label="菜单代码" prop="menuCode">
          <el-input v-model="model.menuCode" :disabled="!isAdd" clearable />
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="model.menuName" clearable />
        </el-form-item>
        <el-form-item label="菜单英文名称" prop="menuEnName">
          <el-input v-model="model.menuEnName" clearable />
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <!-- <el-select v-model="model.menuType" class="full-width" clearable filterable>
            <el-option v-for="(t, index) in menuTypes" :key="index" :label="t.value" :value="t.key">{{ t.value }}</el-option>
          </el-select> -->
          <el-radio-group v-model="model.menuType">
            <el-radio-button v-for="(t, index) in menuTypes" :key="index" :label="t.key">{{ t.value }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="model.parentId" class="full-width" clearable filterable>
            <el-option v-for="(t, index) in allMenus" :key="index" :label="t.label" :value="t.id">{{ t.label }} - 【{{ formatText(menuTypes, t.menuType) }}】</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="model.remark" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="doSave">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="dataMenuOfRoleTitle"
      :visible.sync="permissionMenuOfRoleVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog--per-user-role-privileges-assignment"
    >
      <div v-loading="treeLoading" class="chief-part">
        <div class="roles-picking-pane">
          <el-select
            v-if="allRoles && allRoles.length > 20"
            v-model="selectedRole"
            clearable
            filterable
            placeholder="请选择角色"
            title="角色"
            class="select--user-roles"
            popper-class="el-select-popper--per-user-role-privileges--user-role"
            @change="changeSelectRoleFn"
          >
            <el-option v-for="(t, index) in allRoles" :key="'role' + index" :label="t.roleName" :value="t.id">{{ t.roleName }}【{{ t.roleCode }}】</el-option>
          </el-select>

          <el-radio-group
            v-else
            v-model="selectedRole"
            class="radio-button-group--user-roles"
            @change="changeSelectRoleFn"
          >
            <el-radio-button
              v-for="(t, index) in allRoles"
              :key="'role' + index"
              :label="t.id"
            >{{ t.roleName }}【{{ t.roleCode }}】</el-radio-button>
          </el-radio-group>
        </div>
        <hr>
        <div class="tree-menus">
          <div v-if="!selectedRole" class="tips-container">
            <p class="tip-message">请在左侧选择动车所</p>
          </div>

          <el-tree
            v-if="selectedRole"
            ref="menuTree"
            check-strictly
            :data="treeMenus"
            show-checkbox
            node-key="id"
            @check-change="getCheckedMenu"
          />
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="doSavaMenuOfRole">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { formatText, parseTime } from '@/utils'
import { list, detail, add, modify, remove, roleDetail } from './api'
import autoTableHeight from '@/mixins/autoTableHeight'
import { allRoles, allMenus, setMenuOfRole } from '@/views/menu-management/api'
import ElTableWrapper from '@/components/ElTableWrapper'

export default {
  name: 'MenuManagement',
  components: { ElTableWrapper },
  mixins: [autoTableHeight],
  data () {
    return {
      query: {
        menuCodes: null,
        menuName: null
      },
      defaultQuery: {
        menuCodes: null,
        menuName: null
      },
      pagination: {
        pageNo: 1,
        pageSize: 20,
        totalRecords: 0
      },
      isAdd: false,
      dialogVisible: false,
      isLoading: false,
      treeLoading: false,
      list: [],
      model: {
        createBy: null,
        createTime: null,
        deleted: null,
        fullPath: null,
        icon: null,
        id: null,
        menuCode: null,
        menuEnName: null,
        menuName: null,
        menuType: null,
        orderNum: null,
        parentId: null,
        path: null,
        perms: null,
        remark: null,
        updateBy: null,
        updateTime: null,
        url: null
      },
      defaultModel: {
        createBy: null,
        createTime: null,
        deleted: null,
        fullPath: null,
        icon: null,
        id: null,
        menuCode: null,
        menuEnName: null,
        menuName: null,
        menuType: null,
        orderNum: null,
        parentId: null,
        path: null,
        perms: null,
        remark: null,
        updateBy: null,
        updateTime: null,
        url: null
      },
      rules: {
        menuCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        menuName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        menuEnName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        menuType: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      dataMenuOfRoleTitle: null,
      permissionMenuOfRoleVisible: false,
      allRoles: [],
      allMenus: [],
      treeMenus: [],
      selectedMenus: [],
      selectedRole: null,
      menuTypes: [
        {
          key: 'DIR',
          value: '目录'
        },
        {
          key: 'MENU',
          value: '菜单'
        },
        {
          key: 'BTN',
          value: '按钮'
        }
      ]
    }
  },
  watch: {
    '$route': {
      handler: 'getList',
      immediate: true
    }
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

    async doAdd () {
      this.isAdd = true
      this.model = cloneDeep(this.defaultModel)
      this.isLoading = true
      await this.getAllRolesAndMenus().finally(() => {
        this.isLoading = false
      })
      this.dialogVisible = true
    },

    async doSetMenu () {
      this.dataMenuOfRoleTitle = '角色配置菜单'
      this.isLoading = true
      await this.getAllRolesAndMenus().finally(() => {
        this.isLoading = false
      })
      this.togglePermissionMenuOfRoleDialogVisible(true)
    },

    async changeSelectRoleFn (id) {
      this.treeLoading = true
      const { data } = await roleDetail(id).finally(() => {
        this.treeLoading = false
      })
      const { menuList } = data || {}
      const menuArr = []
      menuList.forEach(i => menuArr.push(i.id))
      this.$refs.menuTree.setCheckedKeys(menuArr)
    },

    getCheckedMenu () {
      this.selectedMenus = this.$refs.menuTree.getCheckedKeys()
    },

    async doSavaMenuOfRole () {
      if (this.selectedMenus.length === 0) {
        this.$message.warning('请选择菜单')
        return
      }
      const d = {
        id: this.selectedRole,
        data: {
          menuIdList: this.selectedMenus
        }
      }
      await setMenuOfRole(d)
      this.$message.success('配置成功')
      // this.togglePermissionMenuOfRoleDialogVisible(false)
    },

    togglePermissionMenuOfRoleDialogVisible (v) {
      this.selectedRole = null
      this.permissionMenuOfRoleVisible = v
    },

    async doEdit ({ row: { id }}) {
      this.isAdd = false
      this.isLoading = true
      await this.getAllRolesAndMenus().finally(() => {
        this.isLoading = false
      })
      const { data } = await detail(id)
      data.parentId += ''
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
      this.$confirm(`确认删除 ${row.menuName}【${row.menuCode}】？`, '提醒', {
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

    async getAllRolesAndMenus () {
      const [roles, menus] = await Promise.allSettled([allRoles(), allMenus()])
      this.allRoles = roles?.value?.data
      this.allMenus = menus?.value?.data.map(o => ({
        id: o.key,
        label: o.value,
        parentId: o.ext.parentId + '',
        menuType: o.ext.menuType
      }))

      this.treeMenus = this.toTree(this.allMenus)
    },

    toTree (items, id = '0', link = 'parentId') {
      return items
        ?.filter(item => item[link] === id)
        ?.map(item => ({ ...item, children: this.toTree(items, item.id) }))
    },

    formatDate (value, format = '{y}-{m}-{d} {h}:{i}:{s}') {
      return parseTime(value, format)
    },

    formatText (data, value) {
      return formatText(data, value)
    }
  }
}
</script>

<style scoped>
.tree-menus {
  max-height: 50vh;
  width: 100%;
  overflow: auto;
}
</style>

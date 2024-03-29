---
to: src/views/<%= name %>/index.vue
---

<template>
  <ListSkeleton>
    <template #query>
      <el-row :gutter="8">
        <el-col :md="4" :xl="3">
          <el-input-wrapper v-model="query.name" title="姓名" />
        </el-col>
        <el-col :md="4" :xl="3">
          <el-select-wrapper v-model="query.gender" class="w-full" title="性别" :options="enums.genderOptions" />
        </el-col>
        <el-button-wrapper class="ml-2" icon="el-icon-close" @click="resetQuery">清空</el-button-wrapper>
        <el-button-wrapper type="primary" icon="el-icon-search" @click="doSearch">查询</el-button-wrapper>
        <el-button-wrapper type="success" icon="el-icon-plus" @click="doAdd">添加</el-button-wrapper>
      </el-row>
    </template>

    <template #table>
      <el-table-wrapper v-loading="isLoading" :data="list">
        <el-table-column type="index" label="序号" align="center" width="60" />
        <el-table-column label="姓名" align="center" property="name" />
        <el-table-column label="年龄" align="center" property="age" />
        <el-table-column label="性别" align="center" property="gender" :formatter="(row) => formatTextMixin(enums.genderOptions, row.gender)" />
        <el-table-column label="备注" align="center" property="remark" min-width="200" show-tooltip-when-overflow />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <operation-btn-groups :btn-count="3">
              <el-button-wrapper type="text" icon="el-icon-edit" @click="doEdit(scope)">编辑</el-button-wrapper>
              <el-button-wrapper type="text" icon="el-icon-view" @click="doViewInfo(scope)">查看</el-button-wrapper>
              <el-button-wrapper type="text" class="text-red-500" icon="el-icon-delete" @click="doRemove(scope)">删除</el-button-wrapper>
            </operation-btn-groups>
          </template>
        </el-table-column>
      </el-table-wrapper>
    </template>

    <template #pager>
      <el-pagination-wrapper
        :pagination="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>

    <el-dialog :visible.sync="dialogVisible" title="维护">
      <el-form ref="form" :model="model" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input-wrapper v-model="model.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-wrapper v-model="model.age" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select-wrapper v-model="model.gender" class="w-full" :options="enums.genderOptions" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="model.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button-wrapper type="primary" :loading="isSaving" @click="doSave">保存</el-button-wrapper>
      </template>
    </el-dialog>
  </ListSkeleton>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapState } from 'vuex'
import { detail, list, remove, add, modify } from './api'
import ElTableWrapper from '@/components/ElTableWrapper'
import ElSelectWrapper from '@/components/ElSelectWrapper'
import ElButtonWrapper from '@/components/ElButtonWrapper'
import ElInputWrapper from '@/components/ElInputWrapper'
import OperationBtnGroups from '@/components/OperationsWrapper'
import ListSkeleton from '@/components/ListSkeleton'
import ElPaginationWrapper from '@/components/ElPaginationWrapper'

export default {
  name: '<%= h.changeCase.pascal(name) %>',
  components: {
    OperationBtnGroups,
    ElButtonWrapper,
    ElSelectWrapper,
    ElInputWrapper,
    ElTableWrapper,
    ListSkeleton,
    ElPaginationWrapper
  },
  data () {
    return {
      query: {
        name: null,
        gender: null
      },
      defaultQuery: {
        name: null,
        gender: null
      },
      isLoading: false,
      list: [{ id: 1, name: 'James', age: 37, gender: '男', remark: 'lorem' }],
      pagination: {
        pageNo: 1,
        pageSize: 20,
        totalRecords: 0
      },
      isAdd: false,
      dialogVisible: false,
      isLoadingDetail: false,
      model: {
        id: null,
        name: null,
        age: null,
        gender: null,
        remark: null
      },
      defaultModel: {
        id: null,
        name: null,
        age: null,
        gender: null,
        remark: null
      },
      isSaving: false,
      rules: {
        name: [{ required: true, message: '不能为空', validate: 'blur' }],
        age: [{ required: true, message: '不能为空', validate: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState(['enums'])
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

    resetQuery () {
      this.query = cloneDeep(this.defaultQuery)
    },

    handleCurrentChange (pageNo) {
      this.pagination.pageNo = pageNo
      this.getList()
    },

    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.getList()
    },

    async doAdd () {
      this.isAdd = true
      this.model = cloneDeep(this.defaultModel)
      this.toggleDialogVisible(true)
    },

    async doEdit (scope) {
      this.isAdd = false
      this.toggleDialogVisible(true)
      this.isLoadingDetail = true
      this.model = await detail(scope.row.id).finally(() => {
        this.isLoadingDetail = false
      })
    },

    doSave () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const data = cloneDeep(this.model)
          const fn = this.isAdd ? add : modify

          this.isSaving = true
          await fn(data).finally(() => {
            this.isSaving = false
          })
          this.$message.success('保存成功')
          this.toggleDialogVisible(false)
          await this.getList()
        }
      })
    },

    async doViewInfo (scope) {
      this.toggleDialogVisible(true)
      this.isLoadingDetail = true
      this.model = await detail(scope.row.id).finally(() => {
        this.isLoadingDetail = false
      })
    },

    toggleDialogVisible (status) {
      this.dialogVisible = status
    },

    doRemove (scope) {
      this.$confirm(`确认删除？`, '提醒', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove(scope.row.id)
        this.$message.success('删除成功')
        await this.getList()
      }).catch(() => {})
    }
  }
}
</script>

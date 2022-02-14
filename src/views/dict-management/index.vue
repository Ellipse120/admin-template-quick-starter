<template>
  <div>
    <el-row :gutter="10" type="flex" justify="space-between" class="mb-2">
      <el-col :xs="12" :sm="6" :md="6" :lg="3" :xl="3">
        <el-input v-model="query.dicValue" clearable placeholder="请输入大类名称" title="大类名称" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="3" :xl="3">
        <el-input v-model="query.typeName" type="textarea" autosize clearable placeholder="请输入子类名称" title="子类名称" />
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="3" :xl="3">
        <el-input v-model="query.dicDescription" type="textarea" autosize clearable placeholder="请输入字典描述" title="字典描述" />
      </el-col>
      <el-col align="right" :xs="12" :sm="6" :md="6" :lg="15" :xl="15">
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
      <el-table-column label="大类编码" prop="dicKey" align="center" />
      <el-table-column label="大类名称" prop="dicValue" align="center" />
      <el-table-column label="子类编码" prop="dicType" align="center" />
      <el-table-column label="子类名称" prop="typeName" align="center" />
      <el-table-column label="字典描述" prop="dicDescription" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="doEdit(scope)">编辑</el-button>
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
      width="30%"
      :title="isAdd ? '添加' : '编辑'"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="model" :rules="rules" label-width="100px">
        <el-form-item label="大类编码" prop="dicKey">
          <el-input v-model="model.dicKey" clearable :disabled="!isAdd" />
        </el-form-item>
        <el-form-item label="大类名称" prop="dicValue">
          <el-input v-model="model.dicValue" clearable />
        </el-form-item>
        <el-form-item label="子类编码" prop="dicType">
          <el-input v-model="model.dicType" clearable />
          <!--          <el-select v-model="model.dicType" class="full-width" :disabled="!isAdd" clearable filterable default-first-option @change="doDicTypeChnage">-->
          <!--            <el-option v-for="(item, index) in dicTypes" :key="index" :value="item.dicType" :label="item.dicType">-->
          <!--              <div class="flex flex-space-between">-->
          <!--                <div>{{ item.dicType }}</div>-->
          <!--                <div>{{ item.typeName }}</div>-->
          <!--              </div>-->
          <!--            </el-option>-->
          <!--          </el-select>-->
        </el-form-item>
        <el-form-item label="子类名称" prop="typeName">
          <el-input v-model="model.typeName" clearable />
        </el-form-item>
        <el-form-item label="字段描述">
          <el-input v-model="model.dicDescription" type="textarea" clearable />
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="doSave">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapState } from 'vuex'
import { getList, addItem, modifyItem, getDictTypes } from './api'
import autoTableHeight from '@/mixins/autoTableHeight'
import ElTableWrapper from '@/components/ElTableWrapper'

export default {
  name: 'DictManagement',
  components: { ElTableWrapper },
  mixins: [autoTableHeight],
  data () {
    return {
      query: {
        typeName: null,
        dicValue: null
      },
      defaultQuery: {
        typeName: null,
        dicValue: null
      },
      pagination: {
        pageNo: 1,
        pageSize: 20,
        totalRecords: 0
      },
      dicTypes: [],
      isAdd: false,
      dialogVisible: false,
      isLoading: false,
      list: [],
      model: {
        createBy: null,
        createTime: null,
        deleted: null,
        dicDescription: null,
        dicKey: null,
        dicType: null,
        dicValue: null,
        id: null,
        typeName: null,
        updateBy: null,
        updateTime: null
      },
      defaultModel: {
        createBy: null,
        createTime: null,
        deleted: null,
        dicDescription: null,
        dicKey: null,
        dicType: null,
        dicValue: null,
        id: null,
        typeName: null,
        updateBy: null,
        updateTime: null
      },
      rules: {
        dicKey: [{ required: true, message: '不能为空', trigger: 'blur' }],
        dicValue: [{ required: true, message: '不能为空', trigger: 'blur' }],
        dicType: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState([
      'enums'
    ])
  },
  watch: {
    '$route': {
      handler: 'getList',
      immediate: true
    }
  },
  created () {
    this.getCommonData()
  },
  methods: {
    doSearch () {
      this.pagination.pageNo = 1
      this.getList()
    },

    doEdit ({ row }) {
      this.isAdd = false
      this.model = cloneDeep(row)
      this.dialogVisible = true
    },

    async getList () {
      this.isLoading = true
      const query = { ...this.query, ...this.pagination }
      const { data } = await getList(query).finally(() => {
        this.isLoading = false
      })
      this.list = data?.list
      this.pagination = data?.pageReq
    },

    async getCommonData () {
      const { data } = await getDictTypes()
      this.dicTypes = data
    },

    doDicTypeChnage (value) {
      const target = this.dicTypes.find(o => o.dicType === value)
      this.model.typeName = target?.typeName
    },

    doAdd () {
      this.isAdd = true
      this.model = cloneDeep(this.defaultModel)
      this.$refs['form'] && this.$refs['form'].resetFields()
      this.dialogVisible = true
    },

    doSave () {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          const data = cloneDeep(this.model)
          if (this.isAdd) {
            await addItem({
              dicType: data.dicType,
              typeName: data.typeName,
              dicKey: data.dicKey,
              dicValue: data.dicValue,
              dicDescription: data.dicDescription
            })
            this.dialogVisible = false
            this.$message.success('添加成功')
            await this.getList()
          } else {
            await modifyItem({
              id: data.id,
              dicValue: data.dicValue,
              dicDescription: data.dicDescription
            })
            this.dialogVisible = false
            this.$message.success('编辑成功')
            await this.getList()
          }
        }
      })
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
      this.query = Object.assign({}, this.defaultQuery)
    }
  }
}
</script>

<style scoped>

</style>

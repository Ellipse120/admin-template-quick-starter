---
to: src/views/<%= name %>/index.vue
---

<template>
  <ListSkeleton>
    <template #query>
      <el-row :gutter="8">
        <el-col :md="4" :xl="3">
          <el-input-wrapper v-model="query.title" title="标题" />
        </el-col>
        <el-col :md="4" :xl="3">
          <el-select-wrapper v-model="query.status" class="w-full" title="状态" :options="enums.statusOptions" />
        </el-col>
        <el-button-wrapper class="ml-2" icon="el-icon-close" @click="resetQuery">清空</el-button-wrapper>
        <el-button-wrapper type="primary" icon="el-icon-search" @click="doSearch">查询</el-button-wrapper>
        <el-button-wrapper type="success" icon="el-icon-plus" @click="doAdd">添加</el-button-wrapper>
      </el-row>
    </template>

    <template #table>
      <el-table-wrapper v-loading="isLoading" :data="dataList">
        <el-table-column type="index" label="序号" align="center" width="60" />
        <el-table-column label="ID" align="center" property="id" />
        <el-table-column label="标题" align="center" property="title" />
        <el-table-column label="作者" align="center" property="author" />
        <el-table-column label="时间" align="center" property="display_time" :formatter="(row) => formatTimeMixin(new Date(row.display_time))" />
        <el-table-column label="访问量" align="center" property="pageviews" />
        <el-table-column label="状态" align="center" property="status" />
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
      <el-pagination
        :current-page="pagination.pageNo"
        :page-sizes="[10, 20, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.totalRecords"
        @current-change="handlePageNoChange"
        @size-change="handlePageSizeChange"
      />
    </template>

    <el-dialog :visible.sync="manageDialogVisible" :title="manageDialogTitle">
      <el-form ref="formRef" :model="model" :rules="rules" :disabled="manageState === manageStateMapper.VIEW" label-width="80px">
         <el-form-item label="标题" prop="title">
            <el-input-wrapper v-model="model.title" />
         </el-form-item>
         <el-form-item label="作者" prop="author">
           <el-input-wrapper v-model="model.author" />
         </el-form-item>
         <el-form-item label="时间" prop="display_time">
           <el-date-picker v-model="model.display_time" type="datetime" class="!w-full" />
         </el-form-item>
         <el-form-item label="状态" prop="status">
           <el-select-wrapper v-model="model.status" :options="enums.statusOptions" class="w-full" />
         </el-form-item>
      </el-form>

      <template #footer>
        <el-button-wrapper @click="doCloseDialog">关闭</el-button-wrapper>
        <el-button-wrapper v-if="manageState !== manageStateMapper.VIEW" type="primary" :loading="isSaving" @click="doSave">保存</el-button-wrapper>
      </template>
    </el-dialog>
  </ListSkeleton>
</template>

<script>
import { ref } from '@vue/composition-api'
import { detail, list, remove, add, modify } from './api'
import ElTableWrapper from '@/components/ElTableWrapper'
import ElSelectWrapper from '@/components/ElSelectWrapper'
import ElButtonWrapper from '@/components/ElButtonWrapper'
import ElInputWrapper from '@/components/ElInputWrapper'
import OperationBtnGroups from '@/components/OperationsWrapper'
import ListSkeleton from '@/components/ListSkeleton'
import { useList } from '@/composables/useList'

export default {
  name: '<%= h.changeCase.pascal(name) %>',
  components: {
    OperationBtnGroups,
    ElButtonWrapper,
    ElSelectWrapper,
    ElInputWrapper,
    ElTableWrapper,
    ListSkeleton
  },
  setup () {
    const formRef = ref(null)
    const query = ref({
      title: null,
      status: null
    })

    const model = ref({
      id: null,
      title: null,
      author: null,
      display_time: new Date(),
      status: 'draft',
      pageviews: 0
    })
    const rules = ref({})

    const {
      isLoading,
      isSaving,
      isDetailLoading,
      manageDialogVisible,
      manageStateMapper,
      manageState,
      manageDialogTitle,
      dataList,
      pagination,
      enums,
      getList,
      doSearch,
      resetQuery,
      handlePageNoChange,
      handlePageSizeChange,
      doAdd,
      doEdit,
      doSave,
      doViewInfo,
      toggleDialogVisible,
      doCloseDialog,
      doRemove
    } = useList(query, {
      detail,
      list,
      remove,
      add,
      modify
    }, model, formRef)

    getList()

    return {
      isLoading,
      isSaving,
      isDetailLoading,
      manageDialogVisible,
      manageStateMapper,
      manageState,
      manageDialogTitle,
      enums,
      dataList,
      pagination,
      handlePageNoChange,
      handlePageSizeChange,
      getList,
      doSearch,
      resetQuery,
      doAdd,
      doEdit,
      doSave,
      doViewInfo,
      toggleDialogVisible,
      doCloseDialog,
      doRemove,
      formRef,
      model,
      rules,
      query
    }
  }
}
</script>

import { ref, computed } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

const NOOP = () => {}

/**
 * CRUD
 * @param query
 * @param apiFnMapper
 * @param model
 * @return {{isLoading: Ref<UnwrapRef<boolean>>, handlePageNoChange: handlePageNoChange, pagination: Ref<UnwrapRef<{totalRecords: number, pageNo: number, pageSize: number}>>, handlePageSizeChange: handlePageSizeChange, getList: ((function(): Promise<void>)|*), resetQuery: resetQuery, doRemove: ((function(*): Promise<void>)|*), doSearch: ((function(): Promise<void>)|*), list: Ref<UnwrapRef<*[]>>}}
 */
const useList = (query, apiFnMapper = { list: NOOP, add: NOOP, modify: NOOP, remove: NOOP, detail: NOOP }, model, formRef) => {
  const isLoading = ref(false)
  const isSaving = ref(false)
  const isDetailLoading = ref(false)
  const manageDialogVisible = ref(false)
  const manageStateMapper = ref({
    ADD: 'ADD', // 添加
    EDIT: 'EDIT', // 编辑
    VIEW: 'VIEW' // 详情
  })
  const manageState = ref(null)
  const dataList = ref([])
  const pagination = ref({
    pageNo: 1,
    pageSize: 20,
    totalRecords: 0
  })
  const defaultQuery = cloneDeep(query)
  const defaultModel = cloneDeep(model)

  const enums = computed(() => store.state.enums)
  const manageDialogTitle = computed(() => {
    const titleMapper = {
      ADD: '添加',
      EDIT: '编辑',
      VIEW: '详情'
    }

    return titleMapper?.[manageState.value] || ''
  })

  const getList = async () => {
    isLoading.value = true
    const { data } = await apiFnMapper.list({
      ...query.value,
      ...pagination.value
    }).finally(() => {
      isLoading.value = false
    })

    dataList.value = data?.list
    setPagination(data?.pageReq)
  }

  const doSearch = async () => {
    pagination.value.pageNo = 1
    await getList()
  }

  const resetQuery = () => {
    query.value = cloneDeep(defaultQuery)
  }

  const setPagination = (p) => {
    pagination.value = p
  }

  const handlePageNoChange = async (pageNo) => {
    pagination.value.pageNo = pageNo
    await getList()
  }

  const handlePageSizeChange = async (pageSize) => {
    pagination.value.pageSize = pageSize
    await getList()
  }

  const doAdd = () => {
    manageState.value = manageStateMapper.value.ADD
    model.value = cloneDeep(defaultModel.value)
    toggleDialogVisible(true)
  }

  const doEdit = async (scope) => {
    manageState.value = manageStateMapper.value.EDIT
    toggleDialogVisible(true)
    isDetailLoading.value = true
    const { data } = await apiFnMapper.detail(scope.row.id).finally(() => {
      isDetailLoading.value = false
    })
    model.value = data
  }

  const doSave = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const data = model.value
        const fnMapper = {
          [manageStateMapper.value.ADD]: apiFnMapper.add,
          [manageStateMapper.value.EDIT]: apiFnMapper.modify
        }
        const fn = fnMapper?.[manageState.value]

        isSaving.value = true
        await fn(data).finally(() => {
          isSaving.value = false
        })
        Message.success('保存成功')
        toggleDialogVisible(false)
        await getList()
      }
    })
  }

  const doViewInfo = async (scope) => {
    isDetailLoading.value = true
    toggleDialogVisible(true)
    manageState.value = manageStateMapper.value.VIEW
    const { data } = await apiFnMapper.detail(scope.row.id).finally(() => {
      isDetailLoading.value = false
    })
    model.value = data
  }

  const toggleDialogVisible = (visible) => {
    manageDialogVisible.value = visible
  }

  const doCloseDialog = () => {
    toggleDialogVisible(false)
  }

  const doRemove = async (scope) => {
    await MessageBox.confirm(`确认删除？`, '提醒', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await apiFnMapper.remove(scope.row.id)
      Message.success('删除成功')
      await getList()
    }).catch(() => {})
  }

  return {
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
    doRemove,
    toggleDialogVisible,
    doCloseDialog
  }
}

export {
  useList
}

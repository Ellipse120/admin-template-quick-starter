import debounce from 'lodash/debounce'
import { ref, onMounted, onBeforeUnmount, nextTick } from '@vue/composition-api'

/**
 * 自动计算表格高度
 * @param deviation 修正偏差
 * @returns {{tableHeight: null, setHeight: Function}}
 */
const useAutoTableHeight = (deviation = 0) => {
  const tableHeight = ref(null)
  const $_resizeHandler = ref(null)
  const searchTableRef = ref(null)

  const $_initResizeEvent = () => {
    window.addEventListener('resize', $_resizeHandler.value)
  }

  const $_destroyResizeEvent = () => {
    window.removeEventListener('resize', $_resizeHandler.value)
  }

  const setHeight = (deviation) => {
    tableHeight.value = window.innerHeight - searchTableRef?.value.$el?.getBoundingClientRect().top - 84 - deviation
  }

  onMounted(() => {
    $_resizeHandler.value = debounce(() => {
      nextTick(() => {
        setHeight()
      })
    }, 100)
    setHeight(deviation)
    $_initResizeEvent()
  })

  onBeforeUnmount(() => {
    $_destroyResizeEvent()
  })

  return {
    searchTableRef,
    tableHeight,
    setHeight
  }
}

/**
 * 分页Composer
 * @param fn 分页查询函数
 * @returns {{handlePageNoChange: handlePageNoChange, pagination: Ref<UnwrapRef<{totalRecords: number, pageNo: number, pageSize: number}>>, handlePageSizeChange: handlePageSizeChange, resetPagination: resetPagination}}
 */
const usePagingData = (fn) => {
  let pagination = ref({
    pageNo: 1,
    pageSize: 20,
    totalRecords: 0
  })

  const handlePageNoChange = (pageNo) => {
    pagination.value.pageNo = pageNo
    fn()
  }

  const handlePageSizeChange = (pageSize) => {
    pagination.value.pageSize = pageSize
    fn()
  }

  const resetPagination = () => {
    pagination = ref({
      pageNo: 1,
      pageSize: 20,
      totalRecords: 0
    })
  }

  return {
    pagination,
    handlePageNoChange,
    handlePageSizeChange,
    resetPagination
  }
}

export {
  useAutoTableHeight,
  usePagingData
}

import request from '@/utils/request'

const baseUrl = `${process.env.VUE_APP_LOCAL_BASE_API}/syst/dict`

const getList = (params) => {
  return request({
    url: `${baseUrl}`,
    method: 'get',
    params
  })
}

// const getItem = (id) => {
//   return request({
//     url: `${baseUrl}/${id}`,
//     method: 'get'
//   })
// }

const addItem = (data) => {
  return request({
    url: `${baseUrl}`,
    method: 'post',
    data
  })
}

const modifyItem = (data) => {
  return request({
    url: `${baseUrl}/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 获取系统大类
 */
const getDictTypes = () => {
  return request({
    url: `${baseUrl}/dictType`,
    method: 'get'
  })
}

export {
  getList,
  addItem,
  modifyItem,
  getDictTypes
}

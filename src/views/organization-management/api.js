import request from '@/utils/request'

const baseUrl = `${process.env.VUE_APP_LOCAL_BASE_API}/sys/organ`
const baseUrlTrains = `${process.env.VUE_APP_LOCAL_BASE_API}/trains`

export function list (params) {
  return request({
    url: `${baseUrl}`,
    method: 'get',
    params
  })
}

export function detail (id, params) {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'get',
    params
  })
}

export function add (data) {
  return request({
    url: `${baseUrl}`,
    method: 'post',
    data
  })
}

export function modify (data) {
  return request({
    url: `${baseUrl}/${data.id}`,
    method: 'put',
    data
  })
}

export function remove (id) {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'delete'
  })
}

/**
 * 配置 数据
 * @param data
 * @returns {Promise}
 */
export function setDataPermission (data) {
  return request({
    url: `${baseUrl}/${data.id}/perm`,
    method: 'put',
    data: data.data
  })
}

export function trainKVList () {
  return request({
    url: `${baseUrlTrains}/kv`,
    method: 'get'
  })
}

import request from '@/utils/request'

const baseUrl = `${process.env.VUE_APP_LOCAL_BASE_API}/sys/user`

export function list (params) {
  return request({
    url: `${baseUrl}`,
    method: 'get',
    params
  })
}

export function detail (id) {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'get'
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

export function organList (params) {
  return request({
    url: `${process.env.VUE_APP_LOCAL_BASE_API}/sys/organ`,
    method: 'get',
    params
  })
}

/**
 * 用户配置角色
 * @param data
 * @returns {Promise}
 */
export function setRoles (data) {
  return request({
    url: `${baseUrl}/${data.id}/role`,
    method: 'put',
    data: data.data
  })
}

/**
 * 管理员重置用户密码
 * @param data
 * @returns {Promise}
 */
export function resetPassword (data) {
  return request({
    url: `${baseUrl}/resetpassword`,
    method: 'post',
    data
  })
}

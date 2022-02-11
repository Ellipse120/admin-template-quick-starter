import request from '@/utils/request'

const baseUrl = `${process.env.VUE_APP_LOCAL_BASE_API}/sys/menu`

export function list (params) {
  return request({
    url: `${baseUrl}/list`,
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

export function allRoles () {
  return request({
    url: `${process.env.VUE_APP_LOCAL_BASE_API}/sys/role/all`,
    method: 'get'
  })
}

export function allMenus () {
  return request({
    url: `${process.env.VUE_APP_LOCAL_BASE_API}/sys/menu/all`,
    method: 'get'
  })
}

/**
 * 角色配置菜單
 * @param data
 * @returns {Promise}
 */
export function setMenuOfRole (data) {
  return request({
    url: `${process.env.VUE_APP_LOCAL_BASE_API}/sys/role/${data.id}/menu`,
    method: 'put',
    data: data.data
  })
}

export function roleDetail (id) {
  return request({
    url: `${process.env.VUE_APP_LOCAL_BASE_API}/sys/role/${id}`,
    method: 'get'
  })
}

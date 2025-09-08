import request from '@/utils/request'

const baseUrl = `/sys/menu`

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
    url: `/sys/role/all`,
    method: 'get'
  })
}

export function allMenus () {
  return request({
    url: `/sys/menu/all`,
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
    url: `/sys/role/${data.id}/menu`,
    method: 'put',
    data: data.data
  })
}

export function roleDetail (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}

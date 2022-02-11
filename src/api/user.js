import request from '@/utils/request'

const baseUrl = ``

export function login (data) {
  return request({
    url: `${baseUrl}/user/login`,
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: `${baseUrl}/user/info`,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: `${baseUrl}user/logout`,
    method: 'post'
  })
}

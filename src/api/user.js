import request from '@/utils/request'

const baseUrl = `/syst/user/`

export function login (data) {
  return request({
    url: `${baseUrl}login`,
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: `${baseUrl}current`,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: `${baseUrl}logout`,
    method: 'post'
  })
}

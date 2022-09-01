---
to: src/views/<%= name %>/api.js
---
import request from '@/utils/request'

const baseUrl = `/users`

export const list = (params) => {
  return request({
    url: `${baseUrl}`,
    method: 'get',
    params
  })
}

export const detail = (id) => {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'get'
  })
}

export const add = (data) => {
  return request({
    url: `${baseUrl}`,
    method: 'post',
    data
  })
}

export const modify = (data) => {
  return request({
    url: `${baseUrl}/${data.id}`,
    method: 'put',
    data
  })
}

export const remove = (id) => {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'delete'
  })
}


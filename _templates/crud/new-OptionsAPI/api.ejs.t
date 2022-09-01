---
to: src/views/<%= name %>/api.js
---
import request from '@/utils/request'

const baseUrl = `${process.env.VUE_APP_LOCAL_BASE_API}/<%= name %>`

export const list = (params) => {
  return request({
    url: `${baseUrl}/list`,
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


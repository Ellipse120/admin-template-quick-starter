import request from '@/utils/request'

const baseUrl = `/solr`

const getList = (params) => {
  return request({
    url: `${baseUrl}/getodocdocument`,
    method: 'get',
    params
  })
}

export {
  getList
}

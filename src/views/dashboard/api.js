import request from '@/utils/request'

const baseUrl = `${process.env.VUE_APP_LOCAL_BASE_API}/solr`

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

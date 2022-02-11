import request from '@/utils/request'

const baseUrl = `${process.env.VUE_APP_LOCAL_BASE_API}/syst/dict/`

/**
 * 获取枚举
 * @param type 参数可以为单个类型，也可以多个类型以逗号隔开 Ex: 'trainhouse', 'trainhouse,modelid,organs'，type详情参考Swagger
 * @param params
 * @returns {Promise}
 */
const getDiffTypeDictList = (type, params = {}) => {
  return request({
    url: `${baseUrl}kv/${type}`,
    method: 'get',
    params: params
  })
}

export {
  getDiffTypeDictList
}

import request from '@/utils/request'

const baseUrl = `${process.env.VUE_APP_LOCAL_BASE_API}`

const getSelectOptions = (dicType) => {
  return request({
    url: `${baseUrl}/syst/dict/childDictType`,
    method: 'get',
    params: {
      dicType
    }
  })
}

/**
 * 获取多个枚举
 * @param type Ex: DOC_REVISE_STATUS,DOCUMENT_TYPE
 * @param params
 * @returns {Promise}
 */
const getDictionaryList = (type, params = {}) => {
  return request({
    url: `${baseUrl}/syst/dict/demand`,
    method: 'get',
    params: {
      params: type
    }
  })
}

/**
 * 上传文件
 * @param data 文件
 * @param directory 文件目录
 * @returns {*}
 */
const uploadFile = (data, directory) => {
  return request({
    url: `${baseUrl}/ftp/upload`,
    method: 'post',
    param: {
      directory
    },
    data
  })
}

/**
 * 下载文件
 * @param filePath 文件路径
 * @param fileName 文件名字
 * @returns {*}
 */
const downloadFile = (filePath, fileName) => {
  return request({
    url: `${baseUrl}/ftp/download`,
    method: 'get',
    params: {
      filePath,
      fileName
    },
    responseType: 'arraybuffer'
  })
}

const deleteFile = (id) => {
  return request({
    url: `${baseUrl}/file/${id}`,
    method: 'delete'
  })
}

const getUsers = (params) => {
  return request({
    url: `${baseUrl}/sys/user`,
    method: 'get',
    params
  })
}

const getAllOrganizations = (params) => {
  return request({
    url: `${baseUrl}/sys/organ/all`,
    method: 'get',
    params
  })
}

const getTrainType = (params) => {
  return request({
    url: `${baseUrl}/syst/dict/distinct/traintype`,
    method: 'get',
    params
  })
}

export {
  getSelectOptions,
  getDictionaryList,
  uploadFile,
  downloadFile,
  deleteFile,
  getUsers,
  getAllOrganizations,
  getTrainType
}

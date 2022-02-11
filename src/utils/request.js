import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  timeout: 5e5
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

const isJSONBlob = (response) => response?.data instanceof Blob
const isJSONArrayBuffer = (response) => response?.data instanceof ArrayBuffer
const isJSONResponseType = (response) => response?.headers?.['content-type'] === 'application/json'

// response interceptor
service.interceptors.response.use(
  async (response) => {
    if (isJSONBlob(response) || isJSONArrayBuffer(response)) {
      if (isJSONResponseType(response)) {
        let responseJSON

        if (isJSONBlob(response)) {
          responseJSON = await response?.data?.text()
        } else if (isJSONArrayBuffer(response)) {
          const rawStr = String.fromCharCode.apply(null, new Uint8Array(response?.data))
          responseJSON = JSON.parse(decodeURIComponent(escape(rawStr)))
        }

        if (['500'].includes(responseJSON)) {
          Message({
            message: responseJSON?.msg || '服务出错了',
            type: 'error',
            showClose: true,
            duration: 3 * 1000
          })

          return Promise.reject(response)
        }
      }

      return response
    }

    const res = response.data

    if (!['0', '200'].includes(res.code)) {
      Message({
        message: res?.msg || 'Error',
        type: 'error',
        showClose: true,
        duration: 3 * 1000
      })

      if (res.code === '401') {
        MessageBox.confirm('登录超时，是否重新登录', '提醒', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res?.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error?.message)
    } else {
      console.log(error)
      Message({
        message: error?.msg || error?.toString() || '服务出错了',
        type: 'error',
        showClose: true,
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service

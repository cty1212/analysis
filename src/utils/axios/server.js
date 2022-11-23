import axios from 'axios'

import qs from 'qs'

import config from './config'

import { Toast, Dialog } from 'vant'

import { loginUrl } from '../oAuth'
import storage from '../../utils/storage'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
// console.log(source)
const controller = new AbortController()
// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // api 的 base_url
  timeout: config.request_timeout, // 请求超时时间
  cancelToken: source.token,
  signal: controller.signal
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (storage.getItem(`token`)) {
      config.headers.Authorization = `Bearer ` + storage.getItem(`token`)
    }
    if (
      config.method === `post` &&
      config.headers[`Content-Type`] === `application/x-www-form-urlencoded`
    ) {
      config.data = qs.stringify(config.data)
    }
    // ;(config.headers as AxiosRequestHeaders)['Token'] = 'test test'
    // get参数编码
    if (config.method === `get` && config.params) {
      let url = config.url
      url += `?`
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.config.responseType === `blob`) {
      // 如果是文件流，直接过
      return response
    } else if (response.data.errno === config.result_code) {
      return response.data.data
    } else {
      Toast.fail(response.data.message)
      return Promise.reject(response.data.message)
    }
  },
  (error) => {
    console.log(`err，` + error) // for debug
    console.log(error)
    if (
      error.response?.status === 500 &&
      error.response?.data.errno === 40001
    ) {
      console.log(1111)
      Dialog.confirm({
        title: `提示`,
        message: `登录失败，是否重新登录`
      })
        .then(() => {
          loginUrl()
        })
        .catch(() => {
          // on cancel
        })
      source.cancel()
    } else if (error.response?.status === 401) {
      // todo 清除token
      storage.removeItem(`token`)
      Dialog.alert({
        title: `提示`,
        message: `请先登录`
      }).then(() => {
        loginUrl()
      })
      source.cancel()
      controller.abort()
    } else if (
      error.code === `ERR_CANCELED` ||
      error.message === `canceled` ||
      error.name === `CanceledError`
    ) {
      return Promise.reject(error)
    } else {
      Toast.fail(error.message)
    }
    return Promise.reject(error)
  }
)

export { service }

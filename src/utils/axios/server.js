import axios from 'axios'

import qs from 'qs'

import config from './config'

import { Toast } from 'vant'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config) => {
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
    console.log(`err` + error) // for debug
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)

export { service }

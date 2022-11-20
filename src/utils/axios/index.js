import { service } from './server'

import config from './config'

// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// NProgress.configure({ showSpinner: true })

const { default_headers } = config

const request = (option) => {
  const { url, method, params, data, headersType, responseType } = option
  return service({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers
    }
  })
}
export default {
  get: (option) => {
    return new Promise((resolve, reject) => {
      // NProgress.start()
      request({ method: `get`, ...option })
        .then((res) => {
          // NProgress.done()
          resolve(res)
        })
        .catch((err) => {
          // NProgress.done()
          reject(err)
        })
    })
  },
  post: (option) => {
    return request({ method: `post`, ...option })
  },
  delete: (option) => {
    return request({ method: `delete`, ...option })
  },
  put: (option) => {
    return request({ method: `put`, ...option })
  }
}

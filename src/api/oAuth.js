import request from '../utils/axios/index'

const prefix = `api/user`

export const getUserInfo = (data) => {
  return request.post({ url: `${prefix}/userInfo`, data })
}

export const getToken = (data) => {
  return request.post({
    url: data
  })
}

import request from '../utils/axios/index'

const prefix = `api/businessAnalysis`

export const getFxOnline = () => {
  return request.get({ url: `${prefix}/fxOnline` })
}

export const getFxOffline = () => {
  return request.get({ url: `${prefix}/fxOffline` })
}

export const getHshOnline = () => {
  return request.get({ url: `${prefix}/hshOnline` })
}

export const getHshOffline = () => {
  return request.get({ url: `${prefix}/hshOffline` })
}

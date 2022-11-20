import request from '../utils/axios/index'

const prefix = `api/userAnalysis`

export const getTopList = () => {
  return request.get({ url: `${prefix}/topList` })
}

export const getVipLevel = () => {
  return request.get({ url: `${prefix}/vipLevel` })
}

export const getRegistered = () => {
  return request.get({ url: `${prefix}/registered` })
}

export const getRegisteredUsers = () => {
  return request.get({ url: `${prefix}/registeredUsers` })
}

export const getRegisteredSource = () => {
  return request.get({ url: `${prefix}/registeredSource` })
}

export const getUserLife = () => {
  return request.get({ url: `${prefix}/userLife` })
}

export const getBuyAgain = (params) => {
  return request.get({ url: `${prefix}/buyAgain`, params })
}

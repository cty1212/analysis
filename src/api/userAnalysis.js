import request from '../utils/axios/index'

const prefix = `api/userAnalysis`

export const getTopList = () => {
  return request.get({ url: `${prefix}/getTopList` })
}

export const getVipLevel = () => {
  return request.get({ url: `${prefix}/getVipLevel` })
}

export const getRegistered = () => {
  return request.get({ url: `${prefix}/getRegistered` })
}

export const getRegisteredUsers = () => {
  return request.get({ url: `${prefix}/getRegisteredUsers` })
}

export const getRegisteredSource = () => {
  return request.get({ url: `${prefix}/getRegisteredSource` })
}

export const getUserLife = () => {
  return request.get({ url: `${prefix}/getUserLife` })
}

export const getBuyAgain = (params) => {
  return request.get({ url: `${prefix}/getBuyAgain`, params })
}

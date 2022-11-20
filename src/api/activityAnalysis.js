import request from '../utils/axios/index'

const prefix = `api/activityAnalysis`

export const getSiYu = () => {
  return request.get({ url: `${prefix}/siYu` })
}

export const getQiWei = () => {
  return request.get({ url: `${prefix}/qiWei` })
}

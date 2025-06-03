/**
 *
 *  与设备相关的url
 *
 *   getApiUrl("/devices/{sn}").params(sn)
 *
 */

import { getApiUrl } from '@/utils/api'
import { getAppName } from '@/utils/auth'
import store from '@/store'

// 上传设备图片的url
export function uploadImgUrl(resourcetype = '', deviceSn = '', imgType = '') {
  return getApiUrl(
    `/statics/images/resource/${resourcetype}/${deviceSn}/upload/${imgType}`
  )
}

// 上传其他文件
export function uploadFileUrl(resourcetype = '', id = '', assetType = '') {
  return getApiUrl(
    `/statics/assets/resource/${resourcetype}/${id}/upload/${assetType}`
  )
}

// 获取设备图片的url,不缓存，用于设备图片的更新
export function getImgUrl(
  type = '',
  deviceSn = '',
  randomNum = 0,
  imgType = ''
) {
  return `/${store.getters.app.name}/images/resource/${type}/${deviceSn}${imgType}.png?randomId=${randomNum}`
}

// 获取设备图片的url,缓存
export function getCachedImgUrl(type = '', deviceSn = '') {
  return `${process.env.VUE_APP_SERVER_IP}/${store.getters.app.name}/images/resource/${type}/${deviceSn}.png`
}

// 获取form提交地址
export function getSubmitUrl(url) {
  const app = store.getters.app.name || getAppName()
  return url.params({ app })
}

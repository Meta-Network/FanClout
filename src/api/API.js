import request from '@/utils/request'
import axios from 'axios'

import store from '@/utils/store.js'
import { KEY_ACCESS_TOKEN } from '../constants'

export default {
  async getMyUserData () {
    return request.get('/user/stats')
  },
  getImg (hash) {
    return `${process.env.VUE_APP_SS_IMG_URL}${hash}`
  },
  // 客户端打开文章后提交，表示开始阅读
  reading (id) { return request.post(`/posts/${id}/reading`) },
  // 点赞
  like (id, data) { return request.post(`/posts/${id}/like`, data) },

  /** 获取我关注的动态时间线 */
  async getTimeline (page = 1, filters) {
    const headers = {}
    const accessToken = store.get(KEY_ACCESS_TOKEN)
    if (accessToken) headers['x-access-token'] = accessToken
    const { data: res } = await axios.get(process.env.VUE_APP_MATATAKI_CACHE + '/status/timeline', { params: { page, filters }, headers })
    return res
  },
  async getAllTimeline (page = 1, filters) {
    const headers = {}
    const accessToken = store.get(KEY_ACCESS_TOKEN)
    if (accessToken) headers['x-access-token'] = accessToken
    const { data: res } = await axios.get(process.env.VUE_APP_MATATAKI_CACHE + '/status/all-timeline', { params: { page, filters }, headers })
    return res
  },
  /** 点赞动态 */
  async likeEvent (type, platform, dynamicId) {
    const url = process.env.VUE_APP_MATATAKI_CACHE + '/status/interactive/' + type
    const headers = {}
    const accessToken = store.get(KEY_ACCESS_TOKEN)
    if (!accessToken) return this.$t('error.pleaseLogin')
    if (accessToken) headers['x-access-token'] = accessToken
    const { data: res } = await axios.post(url, { platform, dynamicId }, { headers })
    return res
  }
}

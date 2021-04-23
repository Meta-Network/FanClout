import request from '@/utils/request'

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
  like (id, data) { return request.post(`/posts/${id}/like`, data) }
}

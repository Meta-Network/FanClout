import request from '@/utils/request'

export default {
  async getMyUserData () {
    return request.get('/user/stats')
  },
  getImg (hash) {
    return `${process.env.VUE_APP_SS_IMG_URL}${hash}`
  }
}

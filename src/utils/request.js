
import axios from 'axios'
// import { Loading } from 'element-ui'
import { ElMessage } from 'element-plus'
import store from '@/utils/store.js'
import { KEY_ACCESS_TOKEN } from '../constants'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// baseURL: process.env.baseURL || process.env.apiUrl || ""
// timeout: 60 * 1000, // Timeout
// withCredentials: true, // Check cross-site Access-Control

const _axios = axios.create({
  baseURL: process.env.VUE_APP_MTTK_API,
  timeout: 20000,
  headers: {}
})

// let loadingInstance = null;
_axios.interceptors.request.use(
  (config) => {
    // console.log('user request interceptors', config, config.noLoading)
    // if (!config.noLoading) {
    // loadingInstance = Loading.service({
    //   background: 'rgba(0, 0, 0, 0.1)'
    // });
    // }

    // 客户端执行
    if (process.browser) {
      console.log('客户端执行')
      const accessToken = store.get(KEY_ACCESS_TOKEN)
      console.log('accessToken', accessToken)
      if (accessToken) {
        config.headers['x-access-token'] = accessToken
      }
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // if(loadingInstance) loadingInstance.close();
    if (response.status === 429) {
      ElMessage.closeAll()
      ElMessage({
        message: '发文频繁，请稍后重试',
        type: 'error'
      })
    }
    return response.data
  },
  (error) => {
    // loadingInstance.close()
    console.log('axios interceptors response error', error)

    if (error.message.includes('status code 401')) {
      console.warn('登录状态异常,请重新登录')
      store.remove(KEY_ACCESS_TOKEN)
    }

    // 超时处理
    if (error.message.includes('timeout')) {
      console.error('Request timed out 请求超时')
      ElMessage.closeAll()
      ElMessage({
        message: 'Request timed out 请求超时',
        type: 'error'
      })
    }
    if (error.message.includes('Network Error')) {
      // ElMessage.closeAll()
      // ElMessage({
      //   message: '网络错误',
      //   type: 'error'
      // })
      console.error('Network Error 网络错误')
    }
    // loadingInstance.close()
    return Promise.reject(error)
  }
)

export default _axios

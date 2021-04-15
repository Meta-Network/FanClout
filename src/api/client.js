import axios from 'axios'
import store from 'store2'
import { KEY_ACCESS_TOKEN } from '../constants'

const client = axios.create({
  baseURL: process.env.VUE_APP_MTTK_API,
  timeout: 1000 * 60,
  headers: {}
})

client.interceptors.request.use(
  (config) => {
    const accessToken = store.get(KEY_ACCESS_TOKEN)
    if (accessToken) {
      config.headers['x-access-token'] = accessToken
    }
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default client
export { client }

import axios from 'axios'

const client = axios.create({
  baseURL: process.env.VUE_APP_MTTK_API,
  timeout: 1000 * 60
})

client.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error(error)
  }
)

export default client
export { client }

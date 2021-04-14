import axios from 'axios'

const client = axios.create({
  baseURL: process.env.VUE_APP_MTTK_DEV_API
})

/**
 * @typedef RedirectUriResponse
 * @type {object}
 * @property {number} code - Response code.
 * @property {string} message - Response message.
 */

/**
 * 设置 OAuth 的重定向地址
 * @param {string} fromPath 重定向的地址
 * @returns {Promise<RedirectUriResponse>} 设置结果
 */
export async function setOAuthRedirectUri (fromPath = '/') {
  const { data } = await client.post('/app/oauth', {
    clientId: process.env.VUE_APP_MTTK_DEV_CLIENT_ID,
    clientSecret: process.env.VUE_APP_MTTK_DEV_CLIENT_SECRET,
    redirect_uri: `${window.location.origin}/oauth?path=${encodeURIComponent(
      fromPath
    )}`
  })
  return data
}

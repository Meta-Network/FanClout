import client from './client'

/**
 * @typedef GetMyUserDataRes
 * @type {object}
 * @property {number} id - 用户唯一 ID
 * @property {string} username - 用户名
 * @property {string} platform - 用户创建平台
 * @property {string} email - 用户邮箱
 * @property {string} nickname - 用户昵称
 * @property {string} avatar - 用户头像
 * @property {string} create_time - 用户创建时间
 * @property {string} introduction - 用户简介
 */

/**
 * 获取我的用户信息
 * @returns {Promise<GetMyUserDataRes>}
 */
export async function getMyUserData () {
  const { data } = await client.get('/user/stats')
  return data
}


/**
 * @typedef JWTInfo
 * @type {object}
 * @property {(string|null)} iss - 这是签发用户凭证的时候返回的内容，通常可以直接理解为 username，但取决于用户平台不同，这里的值也会相应的有差距
 * @property {(number|null)} exp - 这是过期时间，使用的是 UNIX 时间戳，你可以用 Javascript 的原生类型 Date 来获取内容，比如 `new Date(user.exp)` 就可以知道时间了，但是实际应用中你应该只需要比大小就可以知道是否过期
 * @property {(string|null)} platform - 这是用户登录的时候使用的平台名称，不同的平台会有不同的数据返回，这里我们举例 email
 * @property {(number|null)} id - 这是用户的唯一身份编码，在 Matataki 的用户数据库中，这个是自增值，所以在常规的应用中，你都应该尽量使用这个值来作为参考内容，因为这个值在全部四个值中是唯一不会改变的
 */

/**
 * 解码 JWT 密钥
 * @param {string} token JWT token 字符串
 * @returns {JWTInfo}
 */
export function disassembleJWT (token) {
  if (!token) return { iss: null, exp: 0, platform: null, id: null }
  let tokenPayload = token.substring(token.indexOf('.') + 1)
  tokenPayload = tokenPayload.substring(0, tokenPayload.indexOf('.'))
  return JSON.parse(atob(tokenPayload))
}

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

import { ethers } from 'ethers'
import { BUSD_MTBT_PAIR, MTBT_TOKEN } from '../constants'
import PAIR_ABI from './ABI/Pair.json'

export function getBSCJsonRPCProvider () {
  const bscJsonRpcProvider = new ethers.providers.JsonRpcProvider(process.env.VUE_APP_BSC_RPC_URL, {
    name: 'binance',
    chainId: 56
  })
  return bscJsonRpcProvider
}

export function getPairContract () {
  const provider = getBSCJsonRPCProvider()

  const mtbtContract = new ethers.Contract(BUSD_MTBT_PAIR, PAIR_ABI, provider)

  return mtbtContract
}

/**
 * 获取交易对的合约实例
 * @param {string} address 合约地址
 * @returns 合约实例
 */
export function getPairContractByAddress (address) {
  const provider = getBSCJsonRPCProvider()
  const mtbtContract = new ethers.Contract(address, PAIR_ABI, provider)
  return mtbtContract
}

/**
 * 检查 Token 0 是否是 Meta Token
 * @param {import('ethers').Contract} contract 合约实例
 * @returns {Promise<boolean>} Token 0 是否是 Meta Token
 */
export async function checkMTBTIsToken0 (contract) {
  const token0 = await contract.token0()
  if (token0.toLowerCase() === MTBT_TOKEN.toLowerCase()) {
    return true
  }
  return false
}

export async function getMTBTPrice () {
  const contract = getPairContract()

  const isToken0 = await checkMTBTIsToken0(contract)
  const reserves = await contract.getReserves()

  const reserve0 = reserves._reserve0.toString()
  const reserve1 = reserves._reserve1.toString()

  if (isToken0) {
    return Number(reserve1) / Number(reserve0)
  }

  console.log('getMTBTPrice reserves._reserve0', reserve0, 'reserves._reserve1', reserve1)

  return Number(reserve0) / Number(reserve1)
}

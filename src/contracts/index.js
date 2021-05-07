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

export async function checkMTBTIsToken0 () {
  const contract = getPairContract()
  const token0 = await contract.token0()
  if (token0.toLowerCase() === MTBT_TOKEN.toLowerCase()) {
    return true
  }
  return false
}

export async function getMTBTPrice () {
  const contract = getPairContract()

  const isToken0 = await checkMTBTIsToken0()
  const reserves = await contract.getReserves()

  const reserve0 = reserves._reserve0.toString()
  const reserve1 = reserves._reserve1.toString()

  if (isToken0) {
    return Number(reserve1) / Number(reserve0)
  }

  console.log('getMTBTPrice reserves._reserve0', reserve0, 'reserves._reserve1', reserve1)

  return Number(reserve0) / Number(reserve1)
}

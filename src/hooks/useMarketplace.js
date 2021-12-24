import { useEthers, useContractCalls } from '@usedapp/core'
import { formatEther, formatUnits } from '@ethersproject/units'
import useABI from './useABI'
// import OrderModel from 'model/Order'

export function useGetMyOrders(contractAddress, orderIdList, network) {
  const { contractABI } = useABI('marketplace', network)
  const { chainId, account } = useEthers()

  const callData = {
    address: contractAddress,
    abi: contractABI,
  }

  const dataChain =
    useContractCalls(
      account && orderIdList.length > 0
        ? orderIdList.map((idx) => ({
            ...callData,
            method: 'orders',
            args: [idx],
          }))
        : []
    ).filter((a) => a) ?? []

  if (dataChain.length < 1) {
    return []
  }

  var orders = dataChain.map((chain, i) =>
    OrderModel(
      chain,
      parseInt(formatUnits(orderIdList[i], 0)),
      chainId,
      network
    )
  )

  return orders
}

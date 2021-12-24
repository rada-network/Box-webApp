import { useEthers, useContractCalls } from '@usedapp/core'
import useABI from './useABI'

export function useGetBEP20(enabled, tokenAddress, contractAddress) {
  const { contractABI } = useABI()
  const { account } = useEthers()

  const callData = {
    address: tokenAddress,
    abi: contractABI,
  }

  const dataChain =
    useContractCalls(
      account && tokenAddress && enabled
        ? [
            {
              ...callData,
              ...{ method: 'allowance', args: [account, contractAddress] },
            },
            {
              ...callData,
              ...{ method: 'balanceOf', args: [account] },
            },
          ]
        : []
    ).filter((a) => a) ?? []
  if (dataChain.length < 1) {
    return []
  }

  return dataChain
}

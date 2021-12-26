import { useEthers, useContractCalls } from '@usedapp/core'
import { formatEther, formatUnits } from '@ethersproject/units'
import useABI from './useABI'
import NFTModel from 'model/NFT'

export function useGetDataNft(
  enabled,
  contractAddress,
  nftContract,
  nfts,
  network
) {
  const { contractABI } = useABI('factory', network)
  const { account } = useEthers()

  const callData = {
    address: contractAddress,
    abi: contractABI,
  }
  const contractChain =
    useContractCalls(
      nfts.length > 0 && enabled && account
        ? nfts.map((idx) => ({
            ...callData,
            method: 'itemsNFT',
            args: [idx],
          }))
        : []
    ).filter((a) => a) ?? []

  const dataChain = []
  contractChain.forEach((chain, i) => {
    dataChain.push(NFTModel(nfts[i], nftContract, chain))
  })

  // console.log(dataChain)

  if (dataChain.length < 1) {
    return []
  }

  return dataChain
}

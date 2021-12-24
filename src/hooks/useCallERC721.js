import { useEthers, useContractCalls, useContractCall } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import useABI from './useABI'

export function useGetERC721(enabled, tokenAddress, contractAddress, network) {
  const { contractABI } = useABI('ERC721', network)
  const { account } = useEthers()

  const callData = {
    address: tokenAddress,
    abi: contractABI,
  }
  const chainObject =
    enabled && account && tokenAddress && contractAddress
      ? [
          {
            ...callData,
            ...{ method: 'isApprovedForAll', args: [account, contractAddress] },
          },
          {
            ...callData,
            ...{ method: 'balanceOf', args: [account] },
          },
        ]
      : []

  const contractChain = useContractCalls(chainObject).filter((a) => a) ?? []
  const dataChain = {
    isApprovedForAll: false,
    balanceOf: 0,
  }

  contractChain.forEach((chain, i) => {
    switch (i) {
      // isApprovedForAll
      case 0:
        dataChain.isApprovedForAll = chain[0] ? true : false
        break
      // balanceOf
      case 1:
        dataChain.balanceOf = parseInt(formatUnits(chain[0], 0))
        break
      default:
    }
  })

  return dataChain
}

export function useGetOwnerOfTokenId(enabled, tokenAddress, tokenId, network) {
  const { contractABI } = useABI('ERC721', network)
  const { account } = useEthers()

  const callData = {
    address: tokenAddress,
    abi: contractABI,
  }
  const chainObject =
    enabled && account && tokenAddress && tokenId
      ? [
          {
            ...callData,
            ...{ method: 'ownerOf', args: [tokenId] },
          },
        ]
      : []

  const contractChain = useContractCalls(chainObject).filter((a) => a) ?? []

  const dataChain = []
  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      dataChain.push(parseInt(formatUnits(chain[0], 0)))
    }
  })

  if (dataChain.length < 1) {
    return []
  }

  return dataChain
}

export function useOwnerTokenIds(enabled, contractAddress, totalNFTs, network) {
  const { contractABI } = useABI('ERC721', network)
  const { account } = useEthers()

  const callData = {
    address: contractAddress,
    abi: contractABI,
  }
  const ids = totalNFTs > 0 ? Array.from(Array(totalNFTs).keys()) : []
  const contractChain =
    useContractCalls(
      totalNFTs > 0 && enabled && account && ids.length > 0
        ? ids.map((idx) => ({
            ...callData,
            method: 'tokenOfOwnerByIndex',
            args: [account, idx],
          }))
        : []
    ).filter((a) => a) ?? []

  const dataChain = []
  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      dataChain.push(parseInt(formatUnits(chain[0], 0)))
    }
  })

  if (dataChain.length < 1) {
    return []
  }

  return dataChain
}

export function useGetApproveNft(enabled, contractAddress, nfts, network) {
  const { contractABI } = useABI('ERC721', network)
  const { chainId, account } = useEthers()

  const factoryAddress = network[chainId].factoryContract.address

  const callData = {
    address: contractAddress,
    abi: contractABI,
  }
  const contractChain =
    useContractCalls(
      nfts.length > 0 && enabled && account
        ? nfts.map((idx) => ({
            ...callData,
            method: 'getApproved',
            args: [idx],
          }))
        : []
    ).filter((a) => a) ?? []

  const dataChain = {}
  contractChain.forEach((chain, i) => {
    if (chain[0]) {
      dataChain[nfts[i]] = chain[0] === factoryAddress
    }
  })

  if (dataChain.length < 1) {
    return []
  }

  return dataChain
}

export function useGetMetaDataTokenId(contractAddress, tokenId, network) {
  const { contractABI } = useABI('ERC721', network)
  const { account } = useEthers()

  const callData = {
    address: contractAddress,
    abi: contractABI,
  }

  const [metaData] =
    useContractCall(
      tokenId > 0 &&
        account && {
          ...callData,
          method: 'tokenURI',
          args: [tokenId],
        }
    ) ?? []
  if (!metaData) {
    return ''
  }
  return metaData
}

import { formatEther, formatUnits } from '@ethersproject/units'
import { formatAddress } from 'utils/format'
// import network from 'config/network'

const NFTModel = (tokenId, contractInfo, chainData) => {
  return {
    tokenId,
    tokenAddress: contractInfo.address,
    baseURI: contractInfo.baseURI,
    chainData,
  }
}

export default NFTModel

import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useEthers } from '@usedapp/core'
import BEP20 from '../config/abi/BEP20.json'
import ERC721 from '../config/abi/ERC721.json'

import factory from '../config/abi/factory.json'
// import network from '../config/network'

const useABI = (contractType, network) => {
  const { chainId, library } = useEthers()
  let contractABI = new utils.Interface(BEP20)
  let contractAddress = ''
  let contractName = 'BEP20'
  let contractInstance = null

  if (contractType === 'ERC721') {
    contractABI = new utils.Interface(ERC721)
    contractName = 'ERC721'
  }

  if (chainId && network) {
    switch (contractType) {
      case 'factory':
        contractABI = new utils.Interface(factory)
        contractAddress = network[chainId].factoryContract.address
        contractName = 'Factory Contract'
        break
      default:
        break
    }
  }
  if (contractAddress) {
    contractInstance = new Contract(contractAddress, contractABI, library)
  }

  return {
    contractABI,
    contractAddress,
    contractType,
    contractName,
    contractInstance,
  }
}

export default useABI

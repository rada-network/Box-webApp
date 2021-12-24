import { useEthers } from '@usedapp/core'

import { Contract } from '@ethersproject/contracts'
import useABI from './useABI'

const useContract = (contractAddress, type = 'BEP20') => {
  const { library } = useEthers()
  const { contractABI } = useABI(type)

  // console.log('useContract', contractAddress, contractABI)

  if (!contractAddress) return null
  return new Contract(contractAddress, contractABI, library)
}

export { useContract }

import { createContext, useContext } from 'react'

// import OrderModel from 'model/Order'
import { useGlobal } from './Global'
import { useLocation } from 'react-router-dom'
import useABI from 'hooks/useABI'
import { useContractCalls } from '@usedapp/core'
import { formatEther, formatUnits } from '@ethersproject/units'

const boxContext = createContext()

const ProvideMysteryBoxes = ({ children }) => {
  const global = useGlobal()
  const location = useLocation()

  const {
    contractABI,
    contractAddress,
    contractName,
    contractType,
    contractInstance,
  } = useABI('factory', global.network)

  const viewPage = location.pathname.indexOf('nfts') > -1 ? 'nfts' : 'tokens'
  const provideValue = {
    isAdmin: false,
    orders: [],
    totalOrder: 0,
    myOrderIds: [],
    totalMyOrder: 0,
    contractName: contractName,
    contractType: contractType,
    contractInstance: contractInstance,
    address: contractAddress,
    account: global.account,
    viewMyOrder: location.pathname.indexOf('myOrders') > -1,
    viewPage,
    totalSoldBoxes: 0,
    totalOpenBoxes: 0,
    priceBox: 0,
    maxBuyPerAddress: 0,
    totalBoxesForSell: 0,
    requireWhitelist: true,
    isAllow: true,
    totalBoxBought: 0,
    startTime: 0,
    endTime: 0,
  }

  const callData = {
    address: contractAddress,
    abi: contractABI,
  }

  var chainArray = []
  if (global.account) {
    chainArray = [
      {
        ...callData,
        ...{ method: 'admins', args: [global.account] },
      },
      {
        ...callData,
        ...{ method: 'whitelistAddresses', args: [global.account] },
      },
      {
        ...callData,
        ...{ method: 'totalSoldBoxes', args: [] },
      },
      {
        ...callData,
        ...{ method: 'totalOpenBoxes', args: [] },
      },
      {
        ...callData,
        ...{ method: 'priceBox', args: [] },
      },
      {
        ...callData,
        ...{ method: 'maxBuyPerAddress', args: [] },
      },
      {
        ...callData,
        ...{ method: 'totalBoxesForSell', args: [] },
      },
      {
        ...callData,
        ...{ method: 'requireWhitelist', args: [] },
      },
      {
        ...callData,
        ...{ method: 'buyersBoxTotal', args: [global.account] },
      },
      {
        ...callData,
        ...{ method: 'startTime', args: [] },
      },
      {
        ...callData,
        ...{ method: 'endTime', args: [] },
      },
    ]
  }

  const contractChain = useContractCalls(chainArray).filter((a) => a) ?? []

  if (contractChain.length < 10) {
    return ''
  }
  try {
    contractChain.forEach((chain, i) => {
      if (chain[0] !== undefined) {
        switch (i) {
          // admins
          case 0:
            provideValue.isAdmin = chain[0]
            break
          //whitelistAddresses
          case 1:
            provideValue.isAllow = chain[0]
            break
          //totalSoldBoxes
          case 2:
            provideValue.totalSoldBoxes = parseInt(formatUnits(chain[0], 0))
            break
          //totalOpenBoxes
          case 3:
            provideValue.totalOpenBoxes = parseInt(formatUnits(chain[0], 0))
            break
          //priceBox
          case 4:
            provideValue.priceBox = parseInt(formatUnits(chain[0], 18))
            break
          //maxBuyPerAddress
          case 5:
            provideValue.maxBuyPerAddress = parseInt(formatUnits(chain[0], 0))
            break
          //totalBoxesForSell
          case 6:
            provideValue.totalBoxesForSell = parseInt(
              formatUnits(chain[0].toString(), 0)
            )
            break
          //requireWhitelist
          case 7:
            provideValue.requireWhitelist = chain[0] === true
            if (provideValue.requireWhitelist === false)
              provideValue.isAllow = true
            break
          //buyersBoxTotal
          case 8:
            provideValue.totalBoxBought = parseInt(formatUnits(chain[0], 0))
            break
          //startTime
          case 9:
            provideValue.startTime = parseInt(formatUnits(chain[0], 0))
            break
          //endTime
          case 10:
            provideValue.endTime = parseInt(formatUnits(chain[0], 0))
            break
          default:
            break
        }
      }
    })
  } catch (err) {
    console.log(err)
  }

  return (
    <boxContext.Provider value={provideValue}>{children}</boxContext.Provider>
  )
}

const useMysteryBox = () => {
  return useContext(boxContext)
}

export { ProvideMysteryBoxes, useMysteryBox }

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { createContext, useContext, useState } from 'react'
import { ChainId, useEthers } from '@usedapp/core'

import config from 'config'
import network from 'config/network.json'

const globalContext = createContext()

const ProvideGlobal = ({ colorMode, children }) => {
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  // const [network, setNetwork] = useState(null)

  const supportedChains =
    process.env.NODE_ENV === 'production' ? [ChainId.BSC] : [ChainId.BSCTestnet]

  // const { activateBrowserWallet, account } = useEthers()
  const { chainId, account, error } = useEthers()

  const isSupportChain = supportedChains.includes(chainId) || false

  /* if (!account) {
    activateBrowserWallet()
    return 'Connecting...'
  } */

  /* const getData = () => {
    fetch(config.configUrl, {
      headers: {
        'Content-Type': 'application/json',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        setNetwork(myJson)
      })
  }

  useEffect(() => {
    getData()
  }, []) */

  // console.log('ProvideGlobal render', loading)
  return (
    <globalContext.Provider
      value={{
        account: account,
        loading: loading,
        setLoading: setLoading,
        loadingMessage: loadingMessage,
        setLoadingMessage: setLoadingMessage,
        colorMode: colorMode,
        error: error,
        network: network,
        supportedChains,
        chainId,
        isSupportChain,
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

const useGlobal = () => {
  return useContext(globalContext)
}

ProvideGlobal.propTypes = {
  colorMode: PropTypes.object,
  children: PropTypes.any,
}
export { ProvideGlobal, useGlobal }

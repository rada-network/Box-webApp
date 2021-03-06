import { useState, useEffect } from 'react'

import {
  Stack,
  Card,
  CardActions,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
} from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ethers } from 'ethers'
import Title from 'components/Title'
import { useMysteryBox } from 'providers/MysteryBoxes'
import { formatEther } from '@ethersproject/units'
import { useActions, useActionState } from 'hooks/useActions'
import { useContract } from 'hooks/useContract'
import { useGetBEP20 } from 'hooks/useCallBEP20'
import { useGlobal } from 'providers/Global'
import NFTModel from 'model/NFT'
import ItemNFT from './ItemNFT'
import { formatDate, fromUnixTime } from 'utils/format'

import {
  useGetERC721,
  useOwnerTokenIds,
  // useGetOwnerOfTokenId,
} from '../../hooks/useCallERC721'
import { useGetDataNft } from '../../hooks/useFactories'

export default function NFTList() {
  const context = useMysteryBox()
  const global = useGlobal()

  const networkConfig = global.network[global.chainId]

  const boxInstance = useContract(
    networkConfig.radaNftContract.address,
    'ERC721'
  )

  const tokenPaymentInstance = useContract(networkConfig.BUSDContract.address)
  const tokenPaymentUserData = useGetBEP20(
    true,
    networkConfig.BUSDContract.address,
    context.contractInstance?.address
  )

  const validEnableTokenPayment =
    tokenPaymentUserData &&
    tokenPaymentUserData[0] &&
    parseInt(formatEther(tokenPaymentUserData[0].toString())) < context.priceBox

  const validBuy =
    !validEnableTokenPayment &&
    tokenPaymentUserData &&
    tokenPaymentUserData[1] &&
    parseInt(formatEther(tokenPaymentUserData[1].toString())) >=
      context.priceBox

  const actions = useActions([
    {
      contractInstance: context.contractInstance,
      func: 'buyBox',
      closeDialog: false,
    },
    {
      contractInstance: context.contractInstance,
      func: 'openBox',
      closeDialog: false,
    },
    {
      contractInstance: tokenPaymentInstance,
      func: 'approve',
      closeDialog: false,
    },
    {
      contractInstance: tokenPaymentInstance,
      func: 'claim',
      closeDialog: false,
    },
  ])
  const { lastAction, success, handleState } = useActionState(actions)

  useEffect(() => {
    if (lastAction && success) {
      switch (lastAction) {
        case 'openBox':
          window.location.reload(false)
          break
        case 'claim':
          window.location.reload(false)
          break
        default:
          break
      }
    }
  }, [lastAction, success])

  /* const actionsBox = useActions([
    {
      contractInstance: boxInstance,
      func: 'approve',
      closeDialog: false,
    },
    {
      contractInstance: boxInstance,
      func: 'setApprovalForAll',
      closeDialog: false,
    },
  ])
  const {
    lastAction: lastActionBox,
    success: successBox,
    handleState: handleStateBox,
  } = useActionState(actionsBox)

  useEffect(() => {
    if (lastActionBox && successBox) {
      switch (lastActionBox) {
        case 'approve':
          window.location.reload(false)
          break
        case 'setApprovalForAll':
          window.location.reload(false)
          break
        default:
          break
      }
    }
  }, [lastActionBox, successBox]) */

  /* const actionsTicket = useActions([
    {
      contractInstance: boxInstance,
      func: 'approve',
      closeDialog: false,
    },
    {
      contractInstance: boxInstance,
      func: 'setApprovalForAll',
      closeDialog: false,
    },
  ])
  const {
    lastAction: lastActionTicket,
    success: successTicket,
    handleState: handleStateTicket,
  } = useActionState(actionsTicket)

  useEffect(() => {
    if (lastActionTicket && successTicket) {
      switch (lastActionTicket) {
        case 'approve':
          window.location.reload(false)
          break
        case 'setApprovalForAll':
          window.location.reload(false)
          break
        default:
          break
      }
    }
  }, [lastActionTicket, successTicket]) */

  const mysteryBoxData = useGetERC721(
    true,
    networkConfig.radaNftContract.address,
    context.contractInstance?.address,
    global.network
  )
  // const validEnableBoxNft = mysteryBoxData.isApprovedForAll === false
  // console.log(mysteryBoxData, 'mysteryBoxData')
  const mysteryBoxOwnerTokenIdData = useOwnerTokenIds(
    true,
    networkConfig.radaNftContract.address,
    mysteryBoxData.balanceOf,
    global.network
  )

  // Get data NFT from Factories Contract
  const boxesList = useGetDataNft(
    true,
    context.contractInstance?.address,
    networkConfig.radaNftContract,
    mysteryBoxOwnerTokenIdData,
    global.network
  )

  // console.log(nftsData)

  /* const boxesList =
    mysteryBoxOwnerTokenIdData.map((tokenId) => {
      return NFTModel(tokenId, networkConfig.radaNftContract)
    }) ?? []
     */
  const defaultBox = NFTModel(0, networkConfig.radaNftContract)

  const handleBuyNow = () => {
    global.setLoading(true)
    global.setLoadingMessage('Please confirm at MetaMask and wait in 15s - 30s')

    const nonce = Math.floor(Math.random() * 999999) + 100000
    actions['buyBox'].func(context.campaignId, nonce)

    handleState('buyBox')
  }

  const handleApprovePayment = () => {
    global.setLoading(true)
    global.setLoadingMessage('Please confirm at MetaMask and wait in 15s - 30s')
    actions['approve'].func(
      context.contractInstance.address,
      ethers.constants.MaxUint256
    )

    handleState('approve')
  }
  const handleOpenBox = (tokenId) => () => {
    global.setLoading(true)
    global.setLoadingMessage('Please confirm at MetaMask and wait in 15s - 30s')
    const nonce = Math.floor(Math.random() * 999999) + 100000
    actions['openBox'].func(tokenId, nonce)

    handleState('openBox')
  }

  /* const handleApproveBox = (tokenId) => () => {
    global.setLoading(true)
    global.setLoadingMessage('Please confirm at MetaMask and wait in 15s - 30s')
    // actionsBox['setApprovalForAll'].func(context.contractInstance.address, true)
    actionsBox['approve'].func(context.contractInstance.address, tokenId)

    handleStateBox('approve')
  } */

  /* const handleApproveTicket = (tokenId) => () => {
    global.setLoading(true)
    global.setLoadingMessage('Please confirm at MetaMask and wait in 15s - 30s')
    // actionsBox['setApprovalForAll'].func(context.contractInstance.address, true)
    actionsTicket['approve'].func(context.contractInstance.address, tokenId)

    handleStateTicket('approve')
  } */

  /* const handleClaim = (tokenId) => () => {
    global.setLoading(true)
    global.setLoadingMessage('Please confirm at MetaMask and wait in 15s - 30s')
    // actionsBox['setApprovalForAll'].func(context.contractInstance.address, true)
    actions['claim'].func(tokenId)

    handleState('claim')
  } */

  if (context.isAllow === false) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ marginBottom: '1rem' }}
      >
        <Box sx={{ display: 'inline-flex' }}>
          <Alert severity="warning" xs={{ marginBottom: '1rem' }}>
            Please make sure {"you're"} in our Whitelist RADERS
            <br />
            Your address is <b>{global.account}</b>
          </Alert>
        </Box>
      </Stack>
    )
  }

  const nowTime = Math.floor(Date.now() / 1000)
  if (context.startTime > nowTime) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ marginBottom: '1rem' }}
      >
        <Box sx={{ display: 'inline-flex' }}>
          <Alert severity="warning" xs={{ marginBottom: '1rem' }}>
            The campaign not start yet.
            <br />
            Please wait to {formatDate(fromUnixTime(context.startTime))}{' '}
          </Alert>
        </Box>
      </Stack>
    )
  }

  const allowBuy =
    context.endTime > nowTime &&
    context.maxBuyPerAddress > context.totalBoxBought &&
    context.totalSoldBoxes < context.totalBoxesForSell

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ marginBottom: '1rem' }}
      >
        <Box sx={{ display: 'inline-flex' }}>
          <Title>Mystery Box</Title>
        </Box>
        <Box sx={{ display: 'inline-flex' }}>
          <Typography variant="body2" color="primary">
            Sold: {context.totalSoldBoxes} / {context.totalBoxesForSell}
          </Typography>
        </Box>
      </Stack>

      <Grid
        container
        spacing={3}
        justifyContent={'center'}
        sx={{ marginBottom: 3 }}
      >
        {allowBuy && (
          <Grid item xs={12} sm={6} lg={6}>
            <Card>
              <ItemNFT
                itemNFT={defaultBox}
                priceBox={context.priceBox}
                network={global.network}
              />
              <CardActions style={{ flex: 1, justifyContent: 'center' }}>
                {validEnableTokenPayment && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleApprovePayment}
                    >
                      Enable {networkConfig.BUSDContract.name}
                    </Button>
                    <ArrowForwardIcon style={{ marginLeft: 10 }} />
                  </>
                )}
                <Button
                  color="secondary"
                  variant="contained"
                  disabled={!validBuy}
                  onClick={handleBuyNow}
                >
                  BUY NOW
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent={'center'}
        sx={{ marginBottom: 3 }}
      >
        {boxesList
          .filter(
            (e) =>
              (e.chainData.isBox && !e.chainData.used) || !e.chainData.isBox
          )
          .map((itemNFT) => (
            <Grid key={`item-${itemNFT.tokenId}`} item xs={12} sm={6} lg={6}>
              <Card>
                <ItemNFT
                  itemNFT={itemNFT}
                  priceBox={0}
                  network={global.network}
                />
                <CardActions style={{ flex: 1, justifyContent: 'center' }}>
                  {itemNFT.chainData.isBox && !itemNFT.chainData.used && (
                    <Button
                      onClick={handleOpenBox(itemNFT.tokenId)}
                      size="small"
                      variant="contained"
                      color="secondary"
                    >
                      OPEN NOW
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      {/* <Grid container spacing={3} justifyContent={'center'}>
        {ticketsList.map((itemNFT) => (
          <Grid key={`item-${itemNFT.tokenId}`} item xs={12} sm={6} lg={6}>
            <Card>
              <ItemNFT
                itemNFT={itemNFT}
                priceBox={0}
                network={global.network}
              />
              <CardActions style={{ flex: 1, justifyContent: 'center' }}>
                {!ticketApproveData[itemNFT.tokenId] && (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleApproveTicket(itemNFT.tokenId)}
                    >
                      Enable {networkConfig.ticketNftContract.name}
                    </Button>
                    <ArrowForwardIcon style={{ marginLeft: 10 }} />
                  </>
                )}
                <Button
                  disabled={!ticketApproveData[itemNFT.tokenId]}
                  onClick={handleClaim(itemNFT.tokenId)}
                  size="small"
                  variant="contained"
                  color="secondary"
                >
                  CLAIM NOW
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </>
  )
}

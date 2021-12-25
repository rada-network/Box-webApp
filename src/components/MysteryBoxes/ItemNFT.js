import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material'
import { useGetMetaDataTokenId } from '../../hooks/useCallERC721'

const ItemNFT = ({ itemNFT, priceBox, network }) => {
  const [metaData, setMetaData] = useState(null)

  /* const getMetaDataTokenId = useGetMetaDataTokenId(
    itemNFT.tokenAddress,
    itemNFT.tokenId,
    network
  )

  const uri =
    getMetaDataTokenId !== '' ? getMetaDataTokenId : `${itemNFT.baseURI}/0` */

  const uri = `${itemNFT.baseURI}/${itemNFT.tokenId}`

  useEffect(() => {
    const getData = () => {
      fetch(uri, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          setMetaData(myJson)
        })
    }

    if (uri) getData()
  }, [uri])

  return (
    <>
      <CardContent>
        <Grid
          flexDirection="column"
          container
          justifyContent="center"
          spacing={1}
        >
          {metaData ? (
            <>
              <Grid item textAlign="center">
                <img
                  alt=""
                  src={metaData.image}
                  style={{ margin: 'auto', maxWidth: '100%', height: 150 }}
                />
              </Grid>
              <Grid item textAlign="center">
                <Typography variant="h6" component="div">
                  {metaData.name} {itemNFT.tokenId > 0 && `#${itemNFT.tokenId}`}
                </Typography>
              </Grid>
            </>
          ) : (
            <CircularProgress color="secondary" style={{ margin: 'auto' }} />
          )}
          {/* <Grid item textAlign="center">
            <Box
              sx={{
                color: 'info.dark',
                display: 'inline',
                fontWeight: 'medium',
              }}
            ></Box>
          </Grid> */}

          {itemNFT.tokenId === 0 ? (
            <>
              <Divider>
                <Typography variant="caption" component="span">
                  price
                </Typography>
              </Divider>
              <Grid item textAlign="center">
                <Box
                  sx={{
                    display: 'inline',
                    fontWeight: 'medium',
                  }}
                >
                  <Typography variant="h5" component="div" color="primary">
                    {priceBox} BUSD
                  </Typography>
                </Box>
              </Grid>
            </>
          ) : (
            <>
              <Divider>
                <Typography
                  variant="caption"
                  component="span"
                  color={'#959595'}
                >
                  surprise ^_^
                </Typography>
              </Divider>
            </>
          )}
        </Grid>
      </CardContent>
    </>
  )
}
ItemNFT.propTypes = {
  itemNFT: PropTypes.object,
  network: PropTypes.object,
  priceBox: PropTypes.number,
}
export default ItemNFT

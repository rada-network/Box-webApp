import Header from 'components/Header'
import Backdrop from 'components/Backdrop'
import Notifications from 'components/Notifications'
import {
  Container,
  CssBaseline,
  Toolbar,
  Snackbar,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import { useGlobal } from 'providers/Global'
// import { ChainId } from '@usedapp/core'

export default function MainLayout({ children }) {
  const global = useGlobal()

  // console.log('MainLayout render', global)

  /* const supportedChains =
    process.env.NODE_ENV === 'production' ? [ChainId.BSC] : [ChainId.BSCTestnet] */

  const handleChangeNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${global.supportedChains[0].toString(16)}` }], // chainId must be in hexadecimal numbers
    })
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {global && global?.error && (
            <Container maxWidth="xs" sx={{ mt: 3, mb: 3 }}>
              <Alert color="warning">
                {global?.error.message}
                {global?.error?.name === 'UnsupportedChainIdError' && (
                  <Button size="small" onClick={handleChangeNetwork}>
                    Change
                  </Button>
                )}
              </Alert>
            </Container>
          )}
          {/* <Alert severity="warning" xs={{ marginBottom: '1rem' }}>
            Please make sure {"you're"} visiting{' '}
            <strong>https://mixed.finance</strong> - check the URL carefully.
          </Alert> */}
          {!global.chainId && !global?.error && (
            <Container maxWidth="xs" sx={{ mt: 3, mb: 3 }}>
              <Alert severity="success" color="info">
                Please connect your wallet !
              </Alert>
            </Container>
          )}

          {global.network && global.chainId ? (
            <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
              {children}
            </Container>
          ) : !global?.error ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <div />
          )}
        </Box>
        <Notifications />
        {/* {global && global?.error && (
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={!!global.error}
            autoHideDuration={10000}
            message={global?.error.message}
            action={
              <Button size="small" onClick={handleChangeNetwork}>
                Change
              </Button>
            }
          />
        )} */}
        <Backdrop />
      </Box>
    </>
  )
}

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
  Stack,
} from '@mui/material'
import { Box } from '@mui/system'
import { useGlobal } from 'providers/Global'
import { useEthers, useConfig } from '@usedapp/core'

export default function MainLayout({ children }) {
  const global = useGlobal()
  const { active, chainId, deactivate } = useEthers()
  // const { account, chainId, deactivate, error, active, library } = useEthers()
  const configUseDapp = useConfig()
  // console.log('MainLayout render', global)

  /* const supportedChains =
    process.env.NODE_ENV === 'production' ? [ChainId.BSC] : [ChainId.BSCTestnet] */

  const handleChangeNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${configUseDapp.readOnlyChainId.toString(16)}` }], // chainId must be in hexadecimal numbers
    })
  }
  /* console.log(global.network)
  console.log(chainId)
  console.log(error)
  console.log(active)
  console.log(library)
  console.log(account)
  console.log(configUseDapp) */

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
          {chainId && chainId !== configUseDapp.readOnlyChainId && (
            <Container maxWidth="xs" sx={{ mt: 3, mb: 3 }}>
              <Alert color="warning">
                Unsupported network, please change to network{' '}
                {configUseDapp.readOnlyChainId}
                <Button size="small" onClick={handleChangeNetwork}>
                  Change
                </Button>
                {active && (
                  <Button size="small" onClick={deactivate}>
                    Disconnect
                  </Button>
                )}
              </Alert>
            </Container>
          )}
          {global && global?.error && (
            <Container maxWidth="xs" sx={{ mt: 3, mb: 3 }}>
              <Alert color="warning">
                {global?.error.message}
                {global?.error?.name.indexOf('support') > -1 && (
                  <Button size="small" onClick={handleChangeNetwork}>
                    Change
                  </Button>
                )}
                <Button size="small" onClick={deactivate}>
                  Disconnect
                </Button>
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
          {chainId === configUseDapp.readOnlyChainId &&
          global.network &&
          global.chainId ? (
            <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
              {children}
            </Container>
          ) : (
            <div />
          )}
        </Box>

        {/* {!global.network ||
          (!global.chainId && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Alert severity="warning" xs={{ marginBottom: '1rem' }}>
                Try refresh the browser if you {"don't"} see the content.{' '}
                <Button
                  size="small"
                  onClick={() => window.location.reload(false)}
                >
                  Refresh
                </Button>
              </Alert>
            </Box>
          ))} */}
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

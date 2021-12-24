import React, { useState } from 'react'

import { styled } from '@mui/system'

import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  IconButton,
  Button,
  Toolbar,
  Typography,
  Snackbar,
  Box,
  Container,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useEthers } from '@usedapp/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import config from 'config'
import { formatAddress } from 'utils/format'

import { useGlobal } from 'providers/Global'
import CustomDialog from './CustomDialog'
import MetaMaskLogo from '../statics/images/metamask.svg'
import WalletConnectLogo from '../statics/images/walletconnect.svg'

const drawerWidth = 240
const walletConnect = new WalletConnectConnector({
  rpc: {
    97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    56: 'https://bsc-dataseed.binance.org/',
  },
  qrcode: true,
})

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default function Header() {
  const { account, activateBrowserWallet, deactivate, activate } = useEthers()

  const global = useGlobal()

  /*  const networkConfig =
    global.isSupportChain && global.network
      ? global.network[global.chainId]
      : {} */

  const isConnected = account !== undefined

  const [open, setOpen] = React.useState(false)
  const [openConnect, setOpenConnect] = useState(false)
  const [activateError, setActivateError] = useState('')
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const toggleDrawer = () => {
    setOpen(!open)
  }
  const handleClose = () => {
    setOpenConnect(false)
  }
  const handleClickOpen = () => {
    setOpenConnect(true)
  }
  const handleChooseWallet = (wallet) => {
    if (wallet === 'metaMask') {
      activateBrowserWallet()
    } else if (wallet === 'walletConnect') {
      activate(walletConnect)
    }
    setOpenConnect(false)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              {config.appName}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              ></Menu> */}
            </Box>

            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            ></Box>
            <Box sx={{ flexGrow: 0 }}>
              {isConnected ? (
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleOpenUserMenu}
                    size="small"
                  >
                    {formatAddress(global.account)}
                    <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon>
                  </Button>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={deactivate}>
                      <Typography textAlign="center">Disconnect</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  disabled={activateError !== ''}
                  color="secondary"
                  variant="contained"
                  onClick={() => handleClickOpen()}
                >
                  Connect Wallet
                </Button>
              )}
              <IconButton
                sx={{ ml: 1 }}
                onClick={global.colorMode.toggleColorMode}
                color="inherit"
              >
                {global.mode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <CustomDialog
        onClose={handleClose}
        open={openConnect}
        title="Connect to a wallet"
        maxWidth="xs"
      >
        <Box
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Button
            sx={{
              width: 230,
            }}
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => handleChooseWallet('metaMask')}
          >
            <img src={MetaMaskLogo} alt="MetaMask" /> MetaMask
          </Button>
          <Box sx={{ m: 1 }} />
          <Button
            sx={{
              width: 230,
            }}
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => handleChooseWallet('walletConnect')}
          >
            <img src={WalletConnectLogo} alt="MetaMask" /> WalletConnect
          </Button>
        </Box>
      </CustomDialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={activateError !== ''}
        autoHideDuration={6000}
        message={activateError}
      />
    </>
  )
}

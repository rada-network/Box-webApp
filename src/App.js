import React, { Suspense, useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { mainRoutes } from './routes'
import { ChainId, DAppProvider } from '@usedapp/core'
import { ProvideGlobal } from 'providers/Global'
import MainLayout from 'layouts/MainLayout'
import Backdrop from 'components/Backdrop'
// import { useMediaQuery } from '@mui/material'
import { brown, deepOrange, grey } from '@mui/material/colors'

function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const [mode, setMode] = React.useState('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
            ...(mode === 'light'
              ? {
                  // palette values for light mode
                  primary: {
                    main: '#4b5563',
                    contrastText: '#fff',
                  },
                  secondary: {
                    main: '#a855f7',
                  },
                  background: {
                    default: '#f3f4f6',
                    paper: '#fff',
                  },
                }
              : {
                  // palette values for dark mode
                  primary: {
                    main: '#cccfd7',
                    contrastText: '#9ba2ae',
                  },
                  secondary: {
                    main: '#6111af',
                  },
                  divider: '#4b5563',
                  background: {
                    default: '#202a37',
                    paper: '#111827',
                  },
                  text: {
                    primary: '#9ba2ae',
                    secondary: grey[500],
                  },
                }),
          },
        }
        /* {
        palette: {
          mode,
          primary: {
            main: '#ff6e40',
            light: '#ffa06d',
            dark: '#c53d13',
            contrastText: '#fff',
          },
          secondary: {
            main: '#ffccbc',
            light: '#ffffee',
            dark: '#cb9b8c',
          },
          background: {
            default: '#fafafa',
            paper: '#fff',
          },
        },
      } */
      ),
    [mode]
  )

  //const supportedChains = process.env.NODE_ENV === 'production' ? [ChainId.BSC] : [ChainId.BSCTestnet]
  const supportedChains = [ChainId.BSCTestnet]

  return (
    <DAppProvider
      config={{
        supportedChains: supportedChains,
        notifications: {
          expirationPeriod: 1000,
          checkInterval: 1000,
        },
      }}
    >
      <ProvideGlobal colorMode={colorMode}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Suspense fallback={<Backdrop />}>
                <Routes>
                  {mainRoutes.map(({ path, exact, element }, i) => {
                    return (
                      <Route
                        key={i}
                        exact={exact}
                        path={path}
                        element={element}
                      />
                    )
                  })}
                </Routes>
              </Suspense>
            </MainLayout>
          </ThemeProvider>
        </BrowserRouter>
      </ProvideGlobal>
    </DAppProvider>
  )
}

export default App

import React, { lazy } from 'react'

const MysteryBoxes = lazy(() => import('../containers/MysteryBoxes'))

const mainRoutes = [
  {
    path: '/',
    exact: true,
    element: <MysteryBoxes />,
  },
]

export { mainRoutes }

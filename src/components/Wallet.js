import { Typography } from '@mui/material'
import { formatAddress } from 'utils/format'
import { useGlobal } from 'providers/Global'

export default function Wallet() {
  const global = useGlobal()

  if (!global.account) {
    return null
  }

  return <Typography>{formatAddress(global.account)}</Typography>
}

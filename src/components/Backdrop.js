import {
  CircularProgress,
  Typography,
  Box,
  Backdrop as BackdropCore,
} from '@mui/material'
import { useGlobal } from 'providers/Global'

export default function Backdrop() {
  const global = useGlobal()

  return (
    <BackdropCore
      sx={{ color: '#fff', zIndex: () => 9999 }}
      open={global.loading}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="inherit" style={{ marginBottom: 20 }} />
        {global.loadingMessage !== '' && (
          <Typography
            component="span"
            variant="body2"
            color="white"
            gutterBottom
          >
            {global.loadingMessage}
          </Typography>
        )}
      </Box>
    </BackdropCore>
  )
}

Backdrop.defaultProps = {
  loading: false,
}

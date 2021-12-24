import * as React from 'react'
import PropTypes from 'prop-types'

import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import CustomDialog from './CustomDialog'

const FilterDialog = (props) => {
  const { handleCloseFilter, openFilter, setFilters, filters } = props

  const handleChangeOrder = (event) => {
    setFilters({ ...filters, filterOrder: event.target.value })
    handleCloseFilter()
  }

  return (
    <CustomDialog
      onClose={handleCloseFilter}
      open={openFilter}
      title="Filter"
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
        <Grid container spacing={3} justifyContent={'center'}>
          <Grid item xs={10}>
            <FormControl size="small" fullWidth>
              <InputLabel id="select-token-sell">View Orders</InputLabel>
              <Select
                labelId="select-token-sell"
                id="token-sell-helper"
                value={filters.filterOrder}
                label="Token for sell"
                onChange={handleChangeOrder}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="on-sale">On sale</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </CustomDialog>
  )
}
FilterDialog.propTypes = {
  handleCloseFilter: PropTypes.func,
  openFilter: PropTypes.bool,
  setFilters: PropTypes.func,
  filters: PropTypes.object,
}
export default FilterDialog

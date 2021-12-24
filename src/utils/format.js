import {
  format,
  parseISO,
  getUnixTime,
  fromUnixTime as fromUnixTimeCore,
} from 'date-fns'

const formatString = 'dd-MM-yyyy HH:mm'

const formatDate = (date) => {
  try {
    let dt = date
    if (!(date instanceof Date)) {
      dt = parseISO(date)
    }
    return `${format(dt, formatString)} GTM`
  } catch (error) {
    return 'Invalid format'
  }
}

const convertUnix = (date) => {
  try {
    if (date) {
      return getUnixTime(date)
    }

    return Date.now() / 1000
  } catch (error) {}
}

const fromUnixTime = (unixTime) => {
  if (unixTime > 0) {
    return fromUnixTimeCore(unixTime)
  }

  return ''
}

const formatAddress = (value) => `${value.substring(0, 6)}...${value.slice(-7)}`

export { formatDate, formatAddress, convertUnix, fromUnixTime }

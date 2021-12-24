import { useNotifications } from '@usedapp/core'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Notifications = () => {
  const { notifications } = useNotifications()

  useEffect(() => {
    const messages = {
      walletConnected: 'Wallet connected',
      transactionStarted: 'Starting...',
      transactionFailed: 'Transaction failed',
      transactionSucceed: 'Transaction succeed',
    }

    notifications
      .filter((n) => n.type !== 'walletConnected')
      .forEach((notification) => {
        toast(`${messages[notification.type]}`)
      })
  }, [notifications])

  return (
    <ToastContainer
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
    />
  )
}

export default Notifications

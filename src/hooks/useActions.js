import { useContractFunction } from '@usedapp/core'
import { useGlobal } from 'providers/Global'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useActions = (actionArray) => {
  const actions = {}

  actionArray.forEach((action) => {
    const [state, func] = GetContractFunction(
      action.contractInstance,
      action.func
    )

    actions[action.func] = {
      state: state,
      func: func,
      closeDialog: action.closeDialog,
    }
  })
  return actions
}

const useActionState = (actions) => {
  const [action, setAction] = useState('')
  const [lastAction, setLastAction] = useState('')
  const [success, setSuccess] = useState(false)
  const [closeDialog, setCloseDialog] = useState(true)
  const global = useGlobal()

  const handleState = useCallback(async (action) => {
    setAction(action)
  }, [])

  useEffect(() => {
    setLastAction(action)
    setSuccess(false)
  }, [action])

  useEffect(() => {
    if (action) {
      const state = actions[action]?.state

      switch (state.status) {
        case 'Success':
          global.setLoading(false)
          global.setLoadingMessage('')
          setSuccess(true)
          setCloseDialog(actions[action]?.closeDialog)
          setAction('')
          state.status = ''
          break
        case 'Mining':
          break
        case 'Exception':
          toast(state.errorMessage)
          global.setLoading(false)
          global.setLoadingMessage('')
          setAction('')
          state.status = ''
          break
        default:
          break
      }
    }
  }, [action, actions, global])

  return { lastAction, success, closeDialog, handleState }
}

const GetContractFunction = (contract, method) => {
  const { state, send } = useContractFunction(contract, method, {
    transactionName: method,
  })

  // console.log('GetContractFunction', method, state)

  return [state, send]
}

export { useActions, useActionState }

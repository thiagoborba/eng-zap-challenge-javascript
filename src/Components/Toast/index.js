import React from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { useContext } from '../../Store'
import { INITIAL_STATE } from '../../Reducer'

export const Toast = () => {
  const { state: { toast: toastState }, toast } = useContext()

  function closeToast () {
    toast(INITIAL_STATE.toast)
  }

  return (
    <Snackbar
      open={toastState.show}
      autoHideDuration={6000}
      onClose={closeToast}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={closeToast} severity={toastState.type}>
        { toastState.message }
      </Alert>
    </Snackbar>
  )
}

export default Toast
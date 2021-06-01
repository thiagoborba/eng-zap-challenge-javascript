import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    zIndex: 1000,
    top: '50%',
    right: '50%'
  }
}))

export const Loader = ({ show, ...props }) => {
  const classes = useStyles()
  return (
    <>
      { show ? (
        <div {...props} className={classes.root}>
          <CircularProgress />
        </div>
      ) : null }
    </>
  )
}

export default Loader
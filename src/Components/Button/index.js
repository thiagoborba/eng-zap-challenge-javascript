import React from 'react'
import { Button as MaterialButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
})

export const Button = ({ ...props }) => {
  const classes = useStyles()
  return (
    <MaterialButton
      {...props}
      className={classes.root}
    />
  )
}

export default Button


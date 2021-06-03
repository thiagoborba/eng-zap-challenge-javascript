import React from 'react'
import { Grid as MateiralGrid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export const Grid = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <MateiralGrid
      { ...props }
      className={classes.root}
      container
      alignItems='center'
      justify='center'
      data-testid='container'
    >
      {children}
    </MateiralGrid>
  )
}

export default Grid
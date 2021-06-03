import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      flex: 1,
      marginRight: 24,
  
      '&:last-child': {
        marginRight: 0,
      }
    },
  
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
  
      '& > *': {
        flex: 'auto',
  
      '&:not(:last-child)': {
          margin: '0 0 16px 0',
        }
      }
    }
  }
}))

export const Wrapper = (props) => {
  const classes = useStyles()
  return (
    <Box 
      { ...props }
      className={classes.root}
    />
  )
}

export default Wrapper
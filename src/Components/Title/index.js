import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0
  }
}))

export const Title = ({ ...props }) => {
  const classes = useStyles()
  return (
    <Typography
      { ...props }
      className={classes.root}
    />
  )
}

export default Title
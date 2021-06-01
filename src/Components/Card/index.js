import React  from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card as CompCard } from '@material-ui/core'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 32,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export const Card = props =>  {
  const classes = useStyles()
  const { property } = props

  return (
    <CompCard className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          { property.id }
        </Typography>
        <img   alt='asdasd' src={property.images[0]}/>
      </CardContent>
    </CompCard>
  )
}

export default Card
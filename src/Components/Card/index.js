import React from 'react'
import { Card as MaterialCard, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Carousel from 'react-material-ui-carousel'
import { Box, Spacing, Title } from '../../Components'
import { getBusinessLabel, getPriceLabel } from '../../utils'

const useStyles = makeStyles({
  card: {
    '&:hover': {
      cursor: 'pointer',
      'box-shadow': '5px 5px 5px -2px rgba(0,0,0,0.34)',
      '-webkit-box-shadow': '5px 5px 5px -2px rgba(0,0,0,0.34)',
      '-moz-box-shadow': '5px 5px 5px -2px rgba(0,0,0,0.34)',
    },
    margin: 32,
    minWidth: 300,
    maxWidth: 350
  },
  box: {
    overflow: 'hidden',
    height: '20vh',
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
})

export const Card = ({ property, onClick, ...props }) => {
  const classes = useStyles()

  return (
    <MaterialCard { ...props } onClick={() => onClick(property)} className={classes.card}>
      <CardContent>
        <Title variant='h5'>
          Imovel para {getBusinessLabel(property.pricingInfos.businessType)}
        </Title>
        <Spacing height='24px' />
        <Carousel
          autoPlay={false}
          navButtonsAlwaysVisible={true}
          indicators={false}
        >
          {property.images.map(img => (
            <Box className={classes.box} key={property.id} >
              <img alt='apartment' className={classes.img} src={img} />
            </Box>
          ))}
        </Carousel>
        <Spacing height='24px' />
        <Title paragraph>
          { getPriceLabel(property.pricingInfos) }
        </Title>
        <Spacing height='8px' />
        <Title paragraph>
          Área útil: { property.usableAreas }/M²
        </Title>
        <Spacing height='8px' />
        <Title paragraph>
          Quartos: { property.bedrooms }
        </Title>
        <Spacing height='8px' />
        <Title paragraph>
          Banheiros: { property.bathrooms }
        </Title>
        <Spacing height='8px' />
        <Title paragraph>
          V. Garagem: { property.parkingSpaces }
        </Title>
      </CardContent>
    </MaterialCard>
  )
}

export default Card
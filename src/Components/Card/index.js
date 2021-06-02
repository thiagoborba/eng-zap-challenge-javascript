import React from 'react'
import { Box, Card as MaterialCard, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Carousel from 'react-material-ui-carousel'
import { Spacing, Title } from '../../Components'
import { BUSINESS_TYPE } from '../../constants'

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
  }
})

function getBusinessLabel(businessType) {
  switch (businessType) {
    case BUSINESS_TYPE.SALE:
      return 'venda'
    case BUSINESS_TYPE.RENTAL:
      return 'aluguel'
    default:
      break;
  }
}

function getPriceLabel (pricingInfos) {
  const { businessType, price, rentalTotalPrice } = pricingInfos
  switch (businessType) {
    case BUSINESS_TYPE.SALE:
      return `R$ ${price}`
    case BUSINESS_TYPE.RENTAL:
      return `R$ ${rentalTotalPrice}/Mês`
    default:
      break;
  }
}

export const Card = ({ property, onClick }) => {
  const classes = useStyles()

  const { address: { city, neighborhood } } = property

  return (
    <MaterialCard onClick={onClick} className={classes.card}>
      <CardContent>
        <Title variant='h5'>
          Imovel para {getBusinessLabel(property.pricingInfos.businessType)}
        </Title>
        <Spacing height='8px' />
        <Title paragraph>
        { city } - { neighborhood }s
        </Title>        
        <Spacing height='8px' />
        <Carousel autoPlay={false}>
          {property.images.map(img => (
            <Box className={classes.box} key={property.id} >
              <img alt='apartment' className={classes.img} src={img} />
            </Box>
          ))}
        </Carousel>
        <Spacing height='16px' />
        <Title paragraph>
          { getPriceLabel(property.pricingInfos) }
        </Title>
        <Title paragraph>
          Quartos: { property.bedrooms }
        </Title>
        <Spacing height='8px' />
        <Title paragraph>
          Banheios: { property.bathrooms }
        </Title>
        <Spacing height='8px' />
        <Title paragraph>
          Banheios: { property.bathrooms }
        </Title>
        <Spacing height='8px' />
        <Title paragraph>
          Área útil: { property.usableAreas }/M²
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
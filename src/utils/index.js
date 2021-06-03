import { BUSINESS_TYPE } from '../constants'

export function getPriceLabel (pricingInfos) {
  const { businessType, price, rentalTotalPrice } = pricingInfos
  switch (businessType) {
    case BUSINESS_TYPE.SALE:
      return `R$ ${price}`
    case BUSINESS_TYPE.RENTAL:
    default:
      return `R$ ${rentalTotalPrice}/Mês`
  }
}

export function getBusinessLabel(businessType) {
  switch (businessType) {
    case BUSINESS_TYPE.SALE:
      return 'venda'
    case BUSINESS_TYPE.RENTAL:
    default:
      return 'aluguel'
  }
}
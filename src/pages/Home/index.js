import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProperties } from '../../api';
import { Box, Button, Card, Grid, Loader, Pagination, Spacing, Title, Wrapper } from '../../Components';
import {
  BUSINESS_TYPE,
  PAGE,
  PAGE_SIZE, VIEW,
  VIVA_REAL_MAXIMUM_RENTAL_PRICE,
  VIVA_REAL_MAXIMUM_SELLING_PRICE,
  ZAP_MINIMAL_RENTAL_PRICE,
  ZAP_MINIMAL_SELLING_PRICE,
  ZAP_MINIMAL_M2_VALUE,
  ZAP_BOUNDING_BOX
} from '../../constants';
import { useContext } from '../../Store';

const INITIAL_STATE = {
  loading: false,
  proprieties: [],
  zapProprieties: [],
  vivaRealProprieties: [],
  view: '',
  pagination: {
    ZAP: {
      totalOfPages: 1,
      currentPage: 1,
    },
    VIVA: {
      totalOfPages: 1,
      currentPage: 1,
    }
  }
}

export const Home = ({ history }) => {
  const [{ loading, zapProprieties, vivaRealProprieties, proprieties, view, pagination }, setState] = useState(INITIAL_STATE)

  const { setSelectedProperty }  = useContext()

  const isZapView = view === VIEW.ZAP
  const isVivaView = view === VIEW.VIVA

  const currentPage = pagination[view]?.currentPage
  const totalOfPages = pagination[view]?.totalOfPages

  const memoizedRenderCard = useCallback(renderCard, [history, setSelectedProperty])
  const memoizedZapProprieties = useMemo(() => memoizedRenderCard(zapProprieties), [zapProprieties, memoizedRenderCard])
  const memoizedVivaRealProprieties = useMemo(() => memoizedRenderCard(vivaRealProprieties), [vivaRealProprieties, memoizedRenderCard])
  const memoizedHandlePaginationChange = useCallback(handlePaginationChange, [view])

  useEffect(() => {
    fetchProprieties();
  }, []);

  useEffect(() => {
    setProprietiesByAgency(proprieties)
  }, [proprieties])

  useEffect(() => {
    memoizedHandlePaginationChange(1)
  }, [memoizedHandlePaginationChange])

  async function fetchProprieties() {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const proprieties = await getProperties();
      setState(prevState => ({ ...prevState, proprieties }))
    } catch (error) {
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }

  function isElegibleForZap(property) {
    const {
      pricingInfos: {
        businessType,
        rentalTotalPrice,
        price
      },
      address: { 
        geoLocation: {
          location: {
            lat: latitude,
            lon: longitude
          }
        }
      },
      usableAreas
    } = property

    const isLatitudeBetweenBounding = ZAP_BOUNDING_BOX.minlat <= latitude && latitude <= ZAP_BOUNDING_BOX.maxlat
    const isLongitudeBetweenBounding = ZAP_BOUNDING_BOX.minlon <= longitude && longitude <= ZAP_BOUNDING_BOX.maxlon
    const isBetweenLocationBounding = isLatitudeBetweenBounding && isLongitudeBetweenBounding

    let minimalSalesPriceByLocation = isBetweenLocationBounding ? (ZAP_MINIMAL_SELLING_PRICE - (ZAP_MINIMAL_SELLING_PRICE * 0.10)) : ZAP_MINIMAL_SELLING_PRICE

    const rentalPrice = parseInt(rentalTotalPrice)
    const salePrice= parseInt(price)
    const hasUsableAreas = !!usableAreas
    const isRental = businessType === BUSINESS_TYPE.RENTAL
    const isSale = businessType === BUSINESS_TYPE.SALE
    const hasMinimalRentalPrice = rentalPrice >= ZAP_MINIMAL_RENTAL_PRICE
    const hasMinimalSalePrice = salePrice >= minimalSalesPriceByLocation
    const m2Value = salePrice / usableAreas
    const hasMinimalM2Value = m2Value > ZAP_MINIMAL_M2_VALUE

    if(isSale) {
      if (!hasUsableAreas) return false

      return hasMinimalM2Value && hasMinimalSalePrice
    }

    return isRental && hasMinimalRentalPrice
  }

  function isElegibleForViva (property) {
    const {
      pricingInfos: {
        businessType,
        rentalTotalPrice,
        price,
        monthlyCondoFee
      },
      address: {
        geoLocation: {
          location: {
            lat: latitude,
            lon: longitude
          }
        }
      }
    } =  property

    const isLatitudeBetweenBounding = ZAP_BOUNDING_BOX.minlat <= latitude && latitude <= ZAP_BOUNDING_BOX.maxlat
    const isLongitudeBetweenBounding = ZAP_BOUNDING_BOX.minlon <= longitude && longitude <= ZAP_BOUNDING_BOX.maxlon
    const isBetweenLocationBounding = isLatitudeBetweenBounding && isLongitudeBetweenBounding

    let maximumRentalPriceByLocation = isBetweenLocationBounding ? (VIVA_REAL_MAXIMUM_RENTAL_PRICE + (VIVA_REAL_MAXIMUM_RENTAL_PRICE * 0.50)) : VIVA_REAL_MAXIMUM_RENTAL_PRICE

    const rentalPrice = parseInt(rentalTotalPrice)
    const salePrice= parseInt(price)
    const monthlyCondoFeePrice = parseInt(monthlyCondoFee)

    const isMonthlyCondoFeeValueValid = !isNaN(monthlyCondoFeePrice)
    const isRental = businessType === BUSINESS_TYPE.RENTAL
    const isSale = businessType === BUSINESS_TYPE.SALE
    const hasMinimalRentalPrice = rentalPrice <= maximumRentalPriceByLocation
    const hasMinimalSalePrice = salePrice <= VIVA_REAL_MAXIMUM_SELLING_PRICE
    const rentalPercentageValue = rentalPrice * 0.30

    const isMonthlyCondoFeeWithinLimit = monthlyCondoFeePrice < rentalPercentageValue

    if (isRental) {
      if (!isMonthlyCondoFeeValueValid) return false
      
      return isMonthlyCondoFeeWithinLimit && hasMinimalRentalPrice
    }
    
    return isSale && hasMinimalSalePrice
  }

  async function setProprietiesByAgency(props) {
    const zapProprieties = []
    const vivaRealProprieties = []

    props.forEach((property) => {
      const { address: { geoLocation: { location: { lat, lon } } } } =  property

      if (!(lat && lon)) return

      const isEligibleForZap = isElegibleForZap(property)
      const isEligibleForViva = isElegibleForViva(property)

      if (isEligibleForZap) zapProprieties.push(property)
      if (isEligibleForViva) vivaRealProprieties.push(property)
    })

    const pagination = {
      ZAP: {
        totalOfPages: Number((zapProprieties.length / PAGE_SIZE).toFixed(0)),
        currentPage: 1,
      },
      VIVA: {
        totalOfPages: Number((vivaRealProprieties.length / PAGE_SIZE).toFixed(0)),
        currentPage: 1,
      }
    };

    setState(prevState => ({ ...prevState, zapProprieties, vivaRealProprieties, pagination }))
  }

  function renderCard (proprieties) {
    return proprieties?.map((property, i) =>
      <Grid item xs key={property.id}>
        <Card
          data-testid={`card-${i}`}
          onClick={() => {
            history.push(PAGE.DETAILS())
            setSelectedProperty(property)
          }}
          property={property}
        />
      </Grid>
    )
  }

  function paginate(array) {
    return array.slice(
      (pagination[view].currentPage - 1) * PAGE_SIZE,
      pagination[view].currentPage * PAGE_SIZE
    )
  }


  function handlePaginationChange(page) {
    setState(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        [view]: {
          ...prevState.pagination[view],
          currentPage: page
        }
      }
    }))
  }

  async function handleClickButtonFilter (view) {
    setState(prevState => ({ ...prevState, view: view }))
  }

  return (
    <div>
      <Loader data-testid='loader' show={loading}/>
      <Title variant='h3' align='center'>
        Grupo Zap
      </Title>
      <Spacing height='40px'/>
      <Title variant='h4' align='center'>
        Clique abaixo para filtrar os imóveis por portal 
      </Title>
      <Spacing height='40px'/>
      <Wrapper>
        <Button
          data-testid='viva-button'
          onClick={() => handleClickButtonFilter(VIEW.VIVA)}
          children='VIVA'
          variant="contained"
          color="secondary"
        />
        <Button
          data-testid='zap-button'
          onClick={() => handleClickButtonFilter(VIEW.ZAP)}
          children='ZAP'
          variant="contained"
          color="primary"
        />
      </Wrapper>
      <Spacing height='40px'/>

      <Grid
        container
        justify='center'
        alignItems='center'
      >
        { isZapView && paginate(memoizedZapProprieties) }
        { isVivaView && paginate(memoizedVivaRealProprieties) }
      </Grid>

      { view && (
        <Box>
          <Spacing height='40px'/>
          <Box style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Title>Página: {currentPage}</Title>
            <Spacing height='16px'/>
            <Pagination data-testid='pagination' color="primary" count={totalOfPages} page={currentPage} onChange={(_, page) => handlePaginationChange(page)} />
          </Box>
        </Box>
      ) }
    </div>
  )
}

export default Home
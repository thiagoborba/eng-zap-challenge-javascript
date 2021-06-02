import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { getProperties } from '../../api';
import { Card, Grid, Loader, Spacing, Title } from '../../Components';
import {
  BUSINESS_TYPE,
  PAGE_SIZE, VIEW,
  VIVA_REAL_MAXIMUM_RENTAL_PRICE,
  VIVA_REAL_MAXIMUM_SELLING_PRICE,
  ZAP_MINIMAL_RENTAL_PRICE,
  ZAP_MINIMAL_SELLING_PRICE
} from '../../constants';

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

export const Home = () => {
  const [{ loading, zapProprieties, vivaRealProprieties, proprieties, view, pagination }, setState] = useState(INITIAL_STATE)

  const isZapView = view === VIEW.ZAP
  const isVivaView = view === VIEW.VIVA

  const currentPage = pagination[view]?.currentPage
  const totalOfPages = pagination[view]?.totalOfPages

  const memoZapProprieties = useMemo(() => renderCard(zapProprieties), [zapProprieties])
  const memoVivaRealProprieties = useMemo(() => renderCard(vivaRealProprieties), [vivaRealProprieties])

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
      console.error(error)
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }

  async function setProprietiesByAgency(props) {
    const zapProprieties = []
    const vivaRealProprieties = []

    props.forEach((property) => {
      const { pricingInfos: { businessType, rentalTotalPrice, price } } =  property

      const intRentalTotalPrice = parseInt(rentalTotalPrice)
      const intPrice= parseInt(price)

      const isEligibleForZap = 
      ((businessType === BUSINESS_TYPE.RENTAL) && (intRentalTotalPrice >= ZAP_MINIMAL_RENTAL_PRICE)) ||
      ((businessType === BUSINESS_TYPE.SALE) && (intPrice >= ZAP_MINIMAL_SELLING_PRICE))

      const isEligibleForViva = 
      ((businessType === BUSINESS_TYPE.RENTAL) && (intRentalTotalPrice <= VIVA_REAL_MAXIMUM_RENTAL_PRICE)) ||
      ((businessType === BUSINESS_TYPE.SALE) && (intPrice <= VIVA_REAL_MAXIMUM_SELLING_PRICE))

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
    return proprieties?.map(property =>
      <Grid item xs key={property.id}>
        <Card
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

  return (
    <div>
      <Loader show={loading}/>
      <Title variant='h3' align='center'>
        Grupo Zap
      </Title>
      <Spacing height='40px'/>
      <Title variant='h4' align='center'>
        Clique abaixo para filtrar os imóveis por portal 
      </Title>
      <Spacing height='40px'/>
      <Box style={{ display: 'flex', justifyContent: 'center', }}>
        <Button
          onClick={() => setState(prevState => ({ ...prevState, view: VIEW.ZAP }))}
          children='ZAP'
        />
        <Button
          onClick={() => setState(prevState => ({ ...prevState, view: VIEW.VIVA }))}
          children='VIVA'
        />
      </Box>
      <Spacing height='40px'/>

      <Grid
        container
        justify='center'
        alignItems='center'
      >
        { isZapView && paginate(memoZapProprieties) }
        { isVivaView && paginate(memoVivaRealProprieties) }
      </Grid>

      { view && (
        <Box>
          <Spacing height='40px'/>
          <Box style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Title>Página: {currentPage}</Title>
            <Spacing height='16px'/>
            <Pagination color="primary" count={totalOfPages} page={currentPage} onChange={(_, page) => handlePaginationChange(page)} />
          </Box>
        </Box>
      ) }
    </div>
  )
}

export default Home
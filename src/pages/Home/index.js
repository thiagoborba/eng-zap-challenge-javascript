import React, { useEffect, useMemo, useState } from 'react'
import { getProperties } from '../../api';
import { Loader } from '../../Components/Loader'
import { Title } from '../../Components/Title';
import { Spacing } from '../../Components/Spacing';
import { Card } from '../../Components/Card'
import { Grid } from '@material-ui/core'
import { Button, Box } from '@material-ui/core'
import { Pagination } from '@material-ui/lab';

const BUSINESS_TYPE = {
  SALE: "SALE",
  RENTAL: 'RENTAL'
}

const ZAP_MINIMAL_RENTAL_PRICE = 3500
const ZAP_MINIMAL_SELLING_PRICE = 600000

const VIVA_REAL_MAXIMUM_RENTAL_PRICE  = 4000
const VIVA_REAL_MAXIMUM_SELLING_PRICE = 700000

const VIEW = {
  ZAP: 'ZAP',
  VIVA: 'VIVA'
}

const PAGE_SIZE = 20

export const Home = () => {
  const [{ loading, zapProprieties, vivaRealProprieties, proprieties, view, pagination }, setState] = useState({
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
  })

  const isZapView = view === VIEW.ZAP
  const isVivaView = view === VIEW.VIVA

  const currentPage = pagination[view]?.currentPage
  const totalOfPages = pagination[view]?.totalOfPages

  const memoZapProprieties = useMemo(() => renderCard(zapProprieties), [zapProprieties])
  const memoVivaRealProprieties = useMemo(() => renderCard(vivaRealProprieties), [vivaRealProprieties])

  useEffect(() => {
    fetchProprieties();
  }, []);

  useEffect(() => {
    setProprietiesByAgency(proprieties)
  }, [proprieties])

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
      <Grid item key={property.id}>
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

  function handlePaginationChange (_, page) {
    setState(prevState => (
      {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          [view]: {
            ...prevState.pagination[view],
            currentPage: page
          }
        }
      } )
    )
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
        >
          Zap
        </Button>
        <Button
          onClick={() => setState(prevState => ({ ...prevState, view: VIEW.VIVA }))}
        >
          VIVA
        </Button>
      </Box>
      <Spacing height='40px'/>

      <Grid
        spacing={1}
        container
        alignItems='center'
        justify='center'
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
            <Pagination count={totalOfPages} page={currentPage} onChange={handlePaginationChange} />
          </Box>
        </Box>
      ) }
    </div>
  )
}

export default Home
import React, { useEffect, useMemo, useState } from 'react'
import { getProperties } from '../../api';
import { Loader } from '../../Components/Loader'
import { Title } from '../../Components/Title';
import { Spacing } from '../../Components/Spacing';

const BUSINESS_TYPE = {
  SALE: "SALE",
  RENTAL: 'RENTAL'
}

const ZAP_MINIMAL_RENTAL_PRICE = 3500
const ZAP_MINIMAL_SELLING_PRICE = 600000

const VIVA_REAL_MAXIMUM_RENTAL_PRICE  = 4000
const VIVA_REAL_MAXIMUM_SELLING_PRICE = 700000

export const Home = () => {
  const [{ loading, zapProprieties, vivaRealProprieties, proprieties }, setState] = useState({
    loading: false,
    proprieties: [],
    zapProprieties: [],
    vivaRealProprieties: []
  })

  const memoZapProprieties = useMemo(() => console.log(zapProprieties), [zapProprieties])
  const memoVivaRealProprieties = useMemo(() => console.log(vivaRealProprieties), [vivaRealProprieties])

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

    setState(prevState => ({ ...prevState, zapProprieties, vivaRealProprieties }))
  }

  function renderCards () {
    
  }

  return (
    <div>
      <Loader show={loading}/>
      <Title variant='h3' align='center'>
        Grupo Zap
      </Title>
      <Spacing height='40px'/>
    </div>
  )
}

export default Home
import React from 'react'
import PricingStrategy from './Strategy/PricingStrategy'
import PricingPlan from './PricingPlan/PricingPlan'
import { Helmet } from 'react-helmet'

const Pricings = () => {
  return (
    <>

      <Helmet>
        <title>Prices</title>
      </Helmet>
      <PricingPlan />
      <PricingStrategy />

    </>
  )
}

export default Pricings
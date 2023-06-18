import React, { createContext, useContext, useState } from 'react'

const PricingContext = createContext();

export const PricingContextProvider = ({children}) => {
    const [pricingSliders,setPricingSLiders] = useState([])
  return (
    <PricingContext.Provider value={[pricingSliders,setPricingSLiders]}>
        {children}
    </PricingContext.Provider>
  )
}

export const usePricingContext = () => useContext(PricingContext)
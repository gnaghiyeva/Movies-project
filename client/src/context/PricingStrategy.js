import React, { createContext, useContext, useState } from 'react'

const PricingStrategy = createContext()
export const PricingStrategyProvider = ({children}) => {
    const [pricingsStrategy, setPricingsStrategy] = useState([])
  return (
    <PricingStrategy.Provider value={[pricingsStrategy,setPricingsStrategy]}>
        {children}
    </PricingStrategy.Provider>
  )
}

export const usePricingStrategy = () => useContext(PricingStrategy)
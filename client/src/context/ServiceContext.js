import React, { useContext, useState,createContext } from 'react'

const ServiceContext = createContext();

export const ServiceContextProvider = ({children}) => {
    const [services,setServices] = useState([])
  return (
    <ServiceContext.Provider value={[services,setServices]}>
        {children}
    </ServiceContext.Provider>
  )
}

export const useServiceContext = () => useContext(ServiceContext)
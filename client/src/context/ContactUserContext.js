import React, { createContext, useContext, useState } from 'react'

const ContactUserContext = createContext();
export const ContactUserContextProvider = ({children}) => {
    const [contactUsers, setContactUsers] = useState([])
  return (
    <ContactUserContext.Provider value={[contactUsers, setContactUsers]}>
         {children}
    </ContactUserContext.Provider>
  )
}

export const useContactUserContext = () => useContext(ContactUserContext)
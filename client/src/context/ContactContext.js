import React, { createContext, useContext, useState } from 'react'

const Contact = createContext()
export const ContactProvider = ({children}) => {
    const [contacts, setContacts] = useState([])
  return (
    <Contact.Provider value={[contacts,setContacts]}>
        {children}
    </Contact.Provider>
  )
}

export const useContact = () => useContext(Contact)
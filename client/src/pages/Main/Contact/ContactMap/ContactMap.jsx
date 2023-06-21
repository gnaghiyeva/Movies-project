import React, { useEffect, useState } from 'react'
import { getAllContacts } from '../../../../api/requests'

const ContactMap = () => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    getAllContacts().then((res) => {
      setContacts(res.data)
    })
  }, [])
  return (
    <div>
      {contacts && contacts.map((contact) => {
        return (
          <iframe style={{ width: '100%', height: '100vh' }} src={contact.location}
          >
          </iframe>
        )
      })}
    </div>
  )
}

export default ContactMap
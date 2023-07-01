import React from 'react'
import ContactSlider from './ContactSlider/ContactSlider'
import BigContact from './BigContact/BigContact'
import ContactMap from './ContactMap/ContactMap'
import { Helmet } from 'react-helmet'

const Contact = () => {
  return (
    <>

      <Helmet>
        <title>Contact</title>
      </Helmet>
      <ContactSlider />
      <BigContact />
      <ContactMap />
    </>
  )
}

export default Contact
import React from 'react'
import ContactSlider from './ContactSlider/ContactSlider'
import BigContact from './BigContact/BigContact'
import Subscribe from './BigContact/Subscribe/Subscribe'
import ContactMap from './ContactMap/ContactMap'

const Contact = () => {
  return (
   <>
    <ContactSlider/>
    <BigContact/>
    <Subscribe/>
    <ContactMap/>
   </>
  )
}

export default Contact
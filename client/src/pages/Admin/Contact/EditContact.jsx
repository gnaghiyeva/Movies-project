import React, { useEffect, useState } from 'react'
import { useContact } from '../../../context/ContactContext';
import { useNavigate, useParams } from 'react-router-dom';
import { editContact, getContactById } from '../../../api/requests';
import { useFormik } from 'formik';
import { contactSchema } from '../../../validation/ContactSchema';
import { Button, TextField } from '@mui/material';
import { Helmet } from 'react-helmet';

const EditContact = () => {
  const [contacts, setContacts] = useContact();
  //   console.log('context', pricingsStrategy)
  const { id } = useParams()
  // console.log(id);
  const navigate = useNavigate()
  const [contact, setContact] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContactById(id).then((res) => {
      setContact(res)
      console.log('first', res)
      formik.values.desc = res.data.desc;
      formik.values.address = res.data.address;
      formik.values.phone = res.data.phone;
      formik.values.email = res.data.email;
      formik.values.location = res.data.location;
      setLoading(false)
    })

  }, [id, loading])


  const handleEdit = async (values, actions) => {
    setContacts(values)
    await editContact(id, values)
    navigate('/admin/contact')
    actions.resetForm()
  }


  const formik = useFormik({
    initialValues: {
      address: contact.address,
      phone: contact.phone,
      email: contact.email,
      desc: contact.desc,
      location: contact.location,


    },
    validationSchema: contactSchema,

    onSubmit: handleEdit

  })
  return (
    <>

      <Helmet>
        <title>Edit Contact</title>
      </Helmet>
      {loading ? <div>loading</div> : <form onSubmit={formik.handleSubmit} >

      <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>Editing Contact</h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
          <TextField type='text' name='desc' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.desc} id="outlined-basic" label="desc" variant="outlined" /><br />
          {formik.errors.desc && formik.touched.desc && (<span>{formik.errors.desc}</span>)}

          <TextField type='text' name='address' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} id="outlined-basic" label="address" variant="outlined" /><br />
          {formik.errors.address && formik.touched.address && (<span>{formik.errors.address}</span>)}

          <TextField type='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id="outlined-basic" label="email" variant="outlined" /><br />
          {formik.errors.email && formik.touched.email && (<span>{formik.errors.email}</span>)}

          <TextField type='text' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id="outlined-basic" label="phone" variant="outlined" /><br />
          {formik.errors.phone && formik.touched.phone && (<span>{formik.errors.phone}</span>)}

          <TextField type='text' name='location' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.location} id="outlined-basic" label="location" variant="outlined" /><br />
          {formik.errors.location && formik.touched.location && (<span>{formik.errors.location}</span>)}
        </div>

        <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0} >Edit</Button>
      </form>}
    </>
  )
}

export default EditContact
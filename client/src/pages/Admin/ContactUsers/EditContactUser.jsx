import React, { useEffect, useState } from 'react'
import { useContactUserContext } from '../../../context/ContactUserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { editContactUser, getContactUserById } from '../../../api/requests';
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import { contactUserSchema } from '../../../validation/ContactUserSchema';
import { Button, TextField } from '@mui/material';

const EditContactUser = () => {
  const [contactUsers, setContactUsers] = useContactUserContext();
  console.log('context', contactUsers)
  const { id } = useParams()
  // console.log(id);
  const navigate = useNavigate()
  const [contactUser, setContactUser] = useState({})
  const [loading, setLoading] = useState(true)



  const handleEdit = async (values, actions) => {
    setContactUsers(values)
    await editContactUser(id, values)

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Streaming edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });


    navigate('/admin/contactUsers')
    actions.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      name: contactUser.name,
      surname: contactUser.surname,
      email: contactUser.email,
      opinions: contactUser.opinions
    },
    validationSchema: contactUserSchema,
    onSubmit: handleEdit

  })



  useEffect(() => {
    getContactUserById(id).then((res) => {
      setContactUser(res)
      console.log('first', res)
      formik.values.name = res.data.name;
      formik.values.surname = res.data.surname;
      formik.values.email = res.data.email;
      formik.values.opinions = res.data.opinions;
      setLoading(false)
    })

  }, [id, loading])





  return (
    <>


    <Helmet>
      <title>Edit Streaming</title>
    </Helmet>

    {loading ? <div>loading</div> : <form onSubmit={formik.handleSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>

      <TextField type='text' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /><br />
      {formik.errors.name && formik.touched.name && (<span>{formik.errors.name}</span>)}

      <TextField type='text' name='surname' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.surname} id="outlined-basic" label="surname" variant="outlined" /><br />
      {formik.errors.surname && formik.touched.surname && (<span>{formik.errors.surname}</span>)}


      <TextField type='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id="outlined-basic" label="email" variant="outlined" /><br />
      {formik.errors.email && formik.touched.email && (<span>{formik.errors.email}</span>)}

      <TextField type='text' name='opinions' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.opinions} id="outlined-basic" label="opinions" variant="outlined" /><br />
      {formik.errors.opinions && formik.touched.opinions && (<span>{formik.errors.opinions}</span>)}

      <Button type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
    </form>}
  </>
  )
}

export default EditContactUser
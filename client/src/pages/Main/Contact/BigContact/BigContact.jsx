import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid';
import emailjs from '@emailjs/browser';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import { Card } from 'antd';
import { Divider } from '@mui/material';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DraftsIcon from '@mui/icons-material/Drafts';
import { getAllContacts, postContactUser } from '../../../../api/requests';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { contactUserSchema } from '../../../../validation/ContactUserSchema';
const BigContact = () => {

    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getAllContacts().then((res) => {
            setContacts(res.data)
        })
    }, [])

    const navigate = useNavigate()
    const handleSubmit = async (values, actions) => {
      await postContactUser(values)
      actions.resetForm()
      navigate('/contact')
    }
  
    const formik = useFormik({
      initialValues: {
        name: '',
        surname: '',
        email: '',
        opinions:''
      },
      validationSchema: contactUserSchema,
      onSubmit: handleSubmit
    })
    return (
        <section style={{ backgroundColor: 'rgb(16,15,23)', color: 'white', padding: '60px  50px' }}>

            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <article>
                        <h1>Contact Form</h1>
                    </article>
                    <br /> <br /> <br />

                    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', border: '1px solid gray' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '15px 20px' }}>
                        <TextField sx={{ input: { color: 'white' } }} style={{ backgroundColor: 'rgb(31,30,36,1)' }} placeholder='name' onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" variant="outlined" /> <br/>
                        {formik.errors.name && formik.touched.name && (<span>{formik.errors.name}</span>)}

                        <TextField sx={{ input: { color: 'white' } }} style={{ backgroundColor: 'rgb(31,30,36,1)' }} placeholder='surname' onChange={formik.handleChange} onBlur={formik.handleBlur} name='surname' type='text' value={formik.values.surname} id="outlined-basic"  variant="outlined" /> <br/>
                        {formik.errors.surname && formik.touched.surname && (<span>{formik.errors.surname}</span>)}

                        <TextField sx={{ input: { color: 'white' } }} style={{ backgroundColor: 'rgb(31,30,36,1)' }} name="email" placeholder='email'  onChange={formik.handleChange} onBlur={formik.handleBlur}  type='email' value={formik.values.email} id="outlined-basic"   variant="outlined" /> <br/>
                        {formik.errors.email && formik.touched.email && (<span>{formik.errors.email}</span>)}

                        <TextareaAutosize style={{ backgroundColor: 'rgb(31,30,36,1)', color: 'white', height: '100px' }} name="opinions" onChange={formik.handleChange} onBlur={formik.handleBlur}  type='text' value={formik.values.opinions} /><br />
                        {formik.errors.opinions && formik.touched.opinions && (<span>{formik.errors.opinions}</span>)}


                        <Button style={{ width: '20%', backgroundColor: 'transparent', border: '1px solid yellow', padding: '16px 10px', borderRadius: '20px' }} variant='contained' color='success' type="submit" >Send Message</Button>
                        </div>

                    </form>

                </Grid>
                {contacts && contacts.map((contact) => {
                    return (
                        <Grid item xs={12} md={6}>
                            <article>
                                <h1>Information</h1>
                            </article>
                            <br /> <br /> <br />

                            <Card style={{ textAlign: 'left', backgroundColor: 'rgb(31,30,36)', color: 'white' }} bordered={false}>
                                <p>{contact.desc}</p>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <EditLocationIcon style={{ color: 'yellow' }} />
                                    <h3 style={{ margin: '25px 0' }}>Address : {contact.address}</h3>
                                </div>

                                <Divider></Divider>

                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <LocalPhoneIcon style={{ color: 'yellow' }} />
                                    <h3 style={{ margin: '25px 0', color: 'white' }}><a style={{ color: 'white' }} href={`tel:${contact.phone}`}>Phone :{contact.phone}</a></h3>
                                </div>

                                <Divider></Divider>

                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <DraftsIcon style={{ color: 'yellow' }} />
                                    <h3 style={{ margin: '25px 0', }}><a style={{ color: 'white' }} href={`mailto:${contact.email}`}>Email : {contact.email}</a></h3>
                                </div>
                            </Card>
                        </Grid>
                    )
                })}


            </Grid>


        </section>
    )
}

export default BigContact
import React, { useRef, useState } from 'react'
import { postService } from '../../../api/requests'
import { useFormik } from 'formik'
import { serviceSchema } from '../../../validation/ServiceSchema'
import { Button, TextField } from '@mui/material'
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet'

const AddService = () => {
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("title", values.title)
        formData.append("desc", values.desc)


        postService(formData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `service added successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        buttonRef.current.style.background = '#1976D2';
        buttonRef.current.textContent = 'Upload File';

        setSelectedImages(null)
        actions.resetForm()
    }


    const formik = useFormik({
        initialValues: {
            image: '',
            title: '',
            desc: ''


        },

        validationSchema: serviceSchema,
        onSubmit: handleSubmit
    })

    return (
        <>

            <Helmet>
                <title>Add Service</title>
            </Helmet>

            <h1 style={{fontFamily:'sans-serif', textAlign:'center'}}>Add Services</h1>

            <form onSubmit={formik.handleSubmit} >
            
               <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
                {formik.errors.title && formik.touched.title && (<span>{formik.errors.title}</span>)}
                <br/>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='desc' value={formik.values.desc} id="outlined-basic" label="description" variant="outlined" />
                {formik.errors.desc && formik.touched.desc && (<span>{formik.errors.desc}</span>)}
                <br/>                

                <Button ref={buttonRef} variant="contained" component="label" >
                    Upload File

                    <input value={formik.values.image}
                        onChange={(e) => {
                            buttonRef.current.style.background = 'red'
                            buttonRef.current.textContent = e.target.files[0].name;
                            formik.handleChange(e)
                            setSelectedImages(e.target.files[0])
                        }}
                        onBlur={formik.handleBlur} name='image' type='file' accept="image/*" hidden
                    />
                </Button>
                {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}
                </div>
                <br/>
                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }}  variant='contained' color='error' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add</Button>
            </form>
        </>
    )
}

export default AddService
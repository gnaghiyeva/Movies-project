import React, { useRef, useState } from 'react'
import { postPricingSlider } from '../../../api/requests'
import { useFormik } from 'formik'
import { pricingSliderSchema } from '../../../validation/PricingSchema'
import { Button, TextField } from '@mui/material'
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet'
const AddPricing = () => {
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("name", values.name)

        postPricingSlider(formData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `pricing added successfully`,
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
            name: '',

        },

        validationSchema: pricingSliderSchema,
        onSubmit: handleSubmit
    })

    return (
        <>

            <Helmet>
                <title>Add Pricing</title>
            </Helmet>

            <h1 style={{fontFamily:'sans-serif', textAlign:'center'}}>Add Prices Sliders</h1>

            <form onSubmit={formik.handleSubmit}>
                    
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>   
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /> <br/>
                {formik.errors.name && formik.touched.name && (<span>{formik.errors.name}</span>)}

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
 
                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} variant='contained' color='error' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add</Button>
            </form>
        </>
    )
}

export default AddPricing
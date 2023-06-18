import React, { useRef, useState } from 'react'
import { postPricingSlider } from '../../../api/requests'
import { useFormik } from 'formik'
import { pricingSliderSchema } from '../../../validation/PricingSchema'
import { Button, TextField } from '@mui/material'

const AddPricing = () => {
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("name", values.name)

        postPricingSlider(formData)
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
    <form onSubmit={formik.handleSubmit}>

    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" />
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


    <Button variant='contained' type='submit'>Add</Button>
</form>
  )
}

export default AddPricing
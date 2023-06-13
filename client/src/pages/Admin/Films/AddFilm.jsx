import React, { useRef, useState } from 'react'
import { postFilm } from '../../../api/requests'
import { useFormik } from 'formik'
import { filmSchema } from '../../../validation/FilmSchema'
import { Button, TextField } from '@mui/material'

const AddFilm = () => {
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("title", values.title)
        formData.append("releaseDate", values.releaseDate)
        formData.append("minute", values.minute)
        formData.append("imdb", values.imdb)
        formData.append("quality", values.quality)
        formData.append("category", values.category)

        postFilm(formData)
        buttonRef.current.style.background = '#1976D2';
        buttonRef.current.textContent = 'Upload File';

        setSelectedImages(null)
        actions.resetForm()
    }


    const formik = useFormik({
        initialValues: {
            image: '',
            title: '',
            releaseDate:'',
            minute:'',
            imdb:'',
            quality:'',
            category:''

        },

        validationSchema: filmSchema,
        onSubmit: handleSubmit
    })
  return (
    <>
    <form onSubmit={formik.handleSubmit}>

        <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
        {formik.errors.title && formik.touched.title && (<span>{formik.errors.title}</span>)}

        <TextField type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} name='releaseDate' value={formik.values.releaseDate} id="outlined-basic" label="releaseDate" variant="outlined" />
        {/* {formik.errors.releaseDate && formik.touched.releaseDate && (<span>{formik.errors.releaseDate}</span>)} */}


        <TextField type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} name='minute' value={formik.values.minute} id="outlined-basic" label="minute" variant="outlined" />
        {formik.errors.minute && formik.touched.minute && (<span>{formik.errors.minute}</span>)}

        <TextField type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} name='imdb' value={formik.values.imdb} id="outlined-basic" label="imdb" variant="outlined" />
        {formik.errors.imdb && formik.touched.imdb && (<span>{formik.errors.imdb}</span>)}

        <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='quality' value={formik.values.quality} id="outlined-basic" label="quality" variant="outlined" />
        {formik.errors.quality && formik.touched.quality && (<span>{formik.errors.quality}</span>)}

        <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='category' value={formik.values.category} id="outlined-basic" label="category" variant="outlined" />
        {formik.errors.category && formik.touched.category && (<span>{formik.errors.category}</span>)}


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
</>
  )
}

export default AddFilm
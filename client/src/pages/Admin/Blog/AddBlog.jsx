import React, { useRef, useState } from 'react'
import { postBlog } from '../../../api/requests'
import { blogSchema } from '../../../validation/BlogSchema'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import Swal from "sweetalert2";

const AddBlog = () => {
  const [selectedImages, setSelectedImages] = useState(null)
  const buttonRef = useRef()

  function handleSubmit(values, actions) {
    const formData = new FormData()
    formData.append("image", selectedImages)
    formData.append("title", values.title)
    formData.append("releaseDate", values.releaseDate)
    formData.append("description", values.description)
    formData.append("author", values.author)
    formData.append("blockquote", values.blockquote)

    postBlog(formData)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `blog added successfully`,
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
      releaseDate: '',
      description: '',
      author: '',
      blockquote: ''


    },

    validationSchema: blogSchema,
    onSubmit: handleSubmit
  })
  return (
    <>

      <form onSubmit={formik.handleSubmit}>

        <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
        {formik.errors.title && formik.touched.title && (<span>{formik.errors.title}</span>)}

        <TextField type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} name='releaseDate' value={formik.values.releaseDate} id="outlined-basic" label="releaseDate" variant="outlined" />
        {/* {formik.errors.releaseDate && formik.touched.releaseDate && (<span>{formik.errors.releaseDate}</span>)} */}


        <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
        {formik.errors.description && formik.touched.description && (<span>{formik.errors.description}</span>)}

        <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='author' value={formik.values.author} id="outlined-basic" label="author" variant="outlined" />
        {formik.errors.author && formik.touched.author && (<span>{formik.errors.author}</span>)}

        <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='blockquote' value={formik.values.blockquote} id="outlined-basic" label="blockquote" variant="outlined" />
        {formik.errors.blockquote && formik.touched.blockquote && (<span>{formik.errors.blockquote}</span>)}


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


        <Button variant='contained' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length>0}>Add</Button>
      </form>

    </>
  )
}

export default AddBlog
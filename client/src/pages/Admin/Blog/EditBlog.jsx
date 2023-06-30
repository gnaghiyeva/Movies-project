import React, { useEffect, useRef, useState } from 'react'
import { useBlogContext } from '../../../context/BlogContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editBlog, getBlogById } from '../../../api/requests'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import Swal from "sweetalert2";

const EditBlog = () => {
  const [selectedImage, setSelectedImage] = useState('');

  const buttonRef = useRef()

  const [setFilms] = useBlogContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    getBlogById(id).then((res) => {
      setBlog(res);
      formik.values.title = res.data.title;
      formik.values.image = res.data.image;
      formik.values.releaseDate = res.data.releaseDate;
      formik.values.description = res.data.description
      formik.values.blockquote = res.data.blockquote
      formik.values.author = res.data.author
      setLoading(false);

    })
  }, [id]);
  const handleEdit = async (values, actions) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', values.image); 
    formData.append('releaseDate', values.releaseDate);
    formData.append('description', values.description);
    formData.append('blockquote', values.blockquote);
    formData.append('author', values.author);

    await editBlog(id, formData); 
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `blog edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/admin/blogs');
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      title: blog.title,
      image: blog.image,
      releaseDate: blog.releaseDate,
      blockquote: blog.blockquote,
      author: blog.author,
      description: blog.description,
    },
    onSubmit: handleEdit,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      formik.setFieldValue('image', file);
    };
  
    reader.readAsDataURL(file);
  };
  
  return (
    <>
      {loading ? <div>loading...</div> : (
        <form onSubmit={formik.handleSubmit}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
            {formik.errors.title && formik.touched.title && (<span>{formik.errors.title}</span>)}

            <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='releaseDate' type='date' value={formik.values.releaseDate} id="outlined-basic" label="releaseDate" variant="outlined" />
            {formik.errors.releaseDate && formik.touched.releaseDate && (<span>{formik.errors.releaseDate}</span>)}

            <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' type='text' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
            {formik.errors.description && formik.touched.description && (<span>{formik.errors.description}</span>)}

            <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='blockquote' type='text' value={formik.values.blockquote} id="outlined-basic" label="blockquote" variant="outlined" />
            {formik.errors.blockquote && formik.touched.blockquote && (<span>{formik.errors.blockquote}</span>)}

            <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='author' type='text' value={formik.values.author} id="outlined-basic" label="author" variant="outlined" />
            {formik.errors.author && formik.touched.author && (<span>{formik.errors.author}</span>)}

            {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}

            <Button ref={buttonRef} variant="contained" component="label">
              Edit File
              <input
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
                name="image"
                type="file"
                accept="image/*"
                hidden
              />
            </Button>

           

            {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length>0}>Edit</Button>
          </div>
        </form>
      )}
    </>
  )
}

export default EditBlog;

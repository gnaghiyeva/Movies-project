import React, { useEffect, useRef, useState } from 'react'
import { editFilm, getFilmById } from '../../../api/requests'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { useFilmContext } from '../../../context/FilmContext'
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet'

const EditFilm = () => {
  const [selectedImages, setSelectedImages] = useState({})
  const buttonRef = useRef()

  const [setFilms] = useFilmContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [film, SetFilm] = useState({});

  useEffect(() => {
    getFilmById(id).then((res) => {
      SetFilm(res);
      formik.values.title = res.data.title;
      formik.values.image = res.data.image;
      formik.values.releaseDate = res.data.releaseDate;
      formik.values.minute = res.data.minute
      formik.values.imdb = res.data.imdb
      formik.values.quality = res.data.quality
      formik.values.category = res.data.category
      setLoading(false);

    })
  }, [id]);
  const handleEdit = async (values, actions) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', values.image);
    formData.append('releaseDate', values.releaseDate);
    formData.append('minute', values.minute);
    formData.append('imdb', values.imdb);
    formData.append('quality', values.quality);
    formData.append('category', values.category);

    await editFilm(id, formData);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `film edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/admin/films');
    actions.resetForm();


  };
  const formik = useFormik({
    initialValues: {
      title: film.title,
      image: film.image,
      releaseDate: film.releaseDate,
      imdb: film.imdb,
      quality: film.quality,
      minute: film.minute,
      category: film.category

    },
    onSubmit: handleEdit,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImages(base64Image);
      formik.setFieldValue('image', file); // Seçilen resmi formik değerine atayın
    };

    reader.readAsDataURL(file);
  };


  return (
    <>

      <Helmet>
        <title>Edit Film</title>
      </Helmet>
      <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>Edit Film</h1>

      {loading ? <div>loading...</div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>

          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
          {formik.errors.title && formik.touched.title && (<span>{formik.errors.title}</span>)}
           <br/>
          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='releaseDate' type='date' value={formik.values.releaseDate} id="outlined-basic" label="releaseDate" variant="outlined" />
          {formik.errors.releaseDate && formik.touched.releaseDate && (<span>{formik.errors.releaseDate}</span>)}
          <br/>
          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='minute' type='number' value={formik.values.minute} id="outlined-basic" label="minute" variant="outlined" />
          {formik.errors.minute && formik.touched.minute && (<span>{formik.errors.minute}</span>)}
          <br/>
          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='quality' type='text' value={formik.values.quality} id="outlined-basic" label="quality" variant="outlined" />
          {formik.errors.quality && formik.touched.quality && (<span>{formik.errors.quality}</span>)}
          <br/>
          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='imdb' type='number' value={formik.values.imdb} id="outlined-basic" label="imdb" variant="outlined" />
          {formik.errors.imdb && formik.touched.imdb && (<span>{formik.errors.imdb}</span>)}
          <br/>
          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='category' type='text' value={formik.values.category} id="outlined-basic" label="category" variant="outlined" />
          {formik.errors.category && formik.touched.category && (<span>{formik.errors.category}</span>)}
          <br/>
          {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}

          <Button ref={buttonRef} variant="contained" component="label" >
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
          {/* <img src={formik.values.image} width={100} height={100} alt='logo'/>
     */}
          {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}
        </div>


        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditFilm
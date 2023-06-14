import React, { useEffect, useRef, useState } from 'react'
import { useServiceContext } from '../../../context/ServiceContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editService, getServiceById } from '../../../api/requests'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'

const EditService = () => {
    const [selectedImages, setSelectedImages] = useState({})
  const buttonRef = useRef()

  const [setServices] = useServiceContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [service, SetService] = useState({});
  
  useEffect(() => {
    getServiceById(id).then((res) => {
      SetService(res);
      formik.values.title = res.data.title;
      formik.values.image = res.data.image;
      formik.values.desc = res.data.desc;
     
      setLoading(false);

    })
  }, [id]);

  const handleEdit = async (values, actions) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', values.image); // FormData'ya seçilen resmi ekleyin
    formData.append('desc', values.desc);
    

    await editService(id, formData); // Düzenlenmiş slaydı kaydetmek için FormData'yı kullanın
    navigate('/admin/services');
    actions.resetForm();


  };
  const formik = useFormik({
    initialValues: {
      title: service.title,
      image: service.image,
      desc: service.desc,
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
      {loading ? <div>loading...</div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         
          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
          {formik.errors.title && formik.touched.title && (<span>{formik.errors.title}</span>)}

          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='desc' type='text' value={formik.values.desc} id="outlined-basic" label="desc" variant="outlined" />
          {formik.errors.desc && formik.touched.desc && (<span>{formik.errors.desc}</span>)}


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
          <Button type='submit' variant='contained' color='success'>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditService
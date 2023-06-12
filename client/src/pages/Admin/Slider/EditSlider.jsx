import React, { useEffect, useRef, useState } from 'react'
import { editSlider, getSliderById } from '../../../api/requests'
import { useFormik } from 'formik'
import { useSliderContext } from '../../../context/SliderContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const EditSlider = () => {
    const[ selectedImages, setSelectedImages] = useState({})
    const buttonRef = useRef()

  const [ setSliders] = useSliderContext()
  const[loading,setLoading] = useState(true)
  const {id} = useParams()
  const navigate = useNavigate();
  const [slider,SetSlider] = useState({});

  useEffect(()=>{
    getSliderById(id).then((res)=>{
      SetSlider(res);
      formik.values.name = res.data.name;
      formik.values.image = res.data.image;
      setLoading(false);
      
    })
  },[id]);

  
  const handleEdit = async(values, actions) => {
    const formData = new FormData();
  formData.append('name', values.name);
  formData.append('image', values.image); // FormData'ya seçilen resmi ekleyin

  await editSlider(id, formData); // Düzenlenmiş slaydı kaydetmek için FormData'yı kullanın
  navigate('/admin/sliders');
  actions.resetForm();
  

  };


  const formik = useFormik({
    initialValues: {
      name: slider.name,
      image:slider.image,
      
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
    <div style={{textAlign:'center',display:'flex', flexDirection:'column',alignItems:'center'}}>
    {/* <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" />
    <br/>
    {formik.errors.name && formik.touched.name && (<span>{formik.errors.name}</span>)}  */}
   
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
  
  <div style={{textAlign:'center', marginTop:'20px'}}>
    <Button type='submit' variant='contained' color='success'>Edit</Button>
    </div>
   </form>}
    </>
  )
}


export default EditSlider
import React, { useEffect, useRef, useState } from 'react'
import { editUpcomingVideo, getUpcomingVideoById } from '../../../api/requests'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDetailContext } from '../../../context/DetailContext'
import Swal from "sweetalert2";
const EditDetail = () => {
    const [selectedVideo, setSelectedVideo] = useState({})
  const buttonRef = useRef()

  const [setUpcomingVideos] = useDetailContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [upcomingVideo, SetUpcomingVideo] = useState({});

  useEffect(() => {
    getUpcomingVideoById(id).then((res) => {
      SetUpcomingVideo(res);
    //   formik.values.desc = res.data.desc;
      console.log(res.data)
    //   formik.values.video = res.data.video;
      setLoading(false);

    })
  }, [id]);
  const handleEdit = async (values, actions) => {
    const formData = new FormData();
    formData.append('desc', values.desc);
    formData.append('video', values.video); 

    await editUpcomingVideo(id, formData); 
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `detail edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/admin/films');
    actions.resetForm();


  };
  const formik = useFormik({
    initialValues: {
      desc: upcomingVideo.desc,
      video: upcomingVideo.video,
    },
    onSubmit: handleEdit,
  });
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64Video = reader.result;
      setSelectedVideo(base64Video);
      formik.setFieldValue('video', file); 
    };
  
    reader.readAsDataURL(file);
  };

  return (
    <>
    {loading ? <div>loading...</div> : <form onSubmit={formik.handleSubmit}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       
        <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='desc' type='text' value={formik.values.desc} id="outlined-basic" label="desc" variant="outlined" />
        {formik.errors.desc && formik.touched.desc && (<span>{formik.errors.desc}</span>)}

        {formik.errors.video && formik.touched.video && (<span>{formik.errors.video}</span>)}

        <Button ref={buttonRef} variant="contained" component="label" >
          Edit File
          <input
            onChange={handleVideoChange}
            onBlur={formik.handleBlur}
            name="video"
            type="file"
            accept="video/mp4"
            hidden
          />
        </Button>
        {/* <img src={formik.values.image} width={100} height={100} alt='logo'/>
   */}
        {formik.errors.video && formik.touched.video && (<span>{formik.errors.video}</span>)}
      </div>


      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type='submit' variant='contained' color='success'>Edit</Button>
      </div>
    </form>}
  </>
  )
}

export default EditDetail
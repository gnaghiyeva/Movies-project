import React, { useEffect, useRef, useState } from 'react'
import { useSongContext } from '../../../context/SongContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editUpcomingSong, getUpcomingSongById } from '../../../api/requests'
import { useFormik } from 'formik'
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet'
import { Button } from '@mui/material'

const EditSong = () => {
  const [selectedSong, setSelectedSong] = useState({})
  const buttonRef = useRef()

  const [setUpcomingSongs] = useSongContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [upcomingSong, SetUpcomingSong] = useState({});

  useEffect(() => {
    getUpcomingSongById(id).then((res) => {
        SetUpcomingSong(res);
      //   formik.values.desc = res.data.desc;
      console.log(res.data)
      //   formik.values.video = res.data.video;
      setLoading(false);

    })
  }, [id]);
  const handleEdit = async (values, actions) => {
    const formData = new FormData();
    // formData.append('name', values.name);
    formData.append('song', values.song);

    await editUpcomingSong(id, formData);
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
    //   name: upcomingSong.name,
      song: upcomingSong.song,
    },
    onSubmit: handleEdit,
  });

  const handleSongChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Song = reader.result;
      setSelectedSong(base64Song);
      formik.setFieldValue('song', file);
    };

    reader.readAsDataURL(file);
  };


  return (
    <>

    <Helmet>
      <title>Edit Detail</title>
    </Helmet>
    <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>Editing Video</h1>

    {loading ? <div>loading...</div> : <form onSubmit={formik.handleSubmit}>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>

        {/* <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /> */}
          <br/>

        <Button ref={buttonRef} variant="contained" component="label" >
          Edit File
          <input
            onChange={handleSongChange}
            onBlur={formik.handleBlur}
            name="song"
            type="file"
            accept="audio/mp3"
            hidden
          />
        </Button>
        {/* <img src={formik.values.image} width={100} height={100} alt='logo'/>
 */}
        {/* {formik.errors.video && formik.touched.video && (<span>{formik.errors.video}</span>)} */}
      </div>


      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
      </div>
    </form>}
  </>
  )
}

export default EditSong
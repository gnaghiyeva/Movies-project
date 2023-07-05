import React, { useRef, useState } from 'react'
import { postUpcomingSong } from '../../../api/requests';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet'
import { Button, TextField } from '@mui/material';

const AddDetailSong = () => {
    const [selectedSong, setSelectedSong] = useState(null)
    const [upcomingSongs, setUpcomingSongs] = useState([]);
    const buttonRef = useRef()
    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("song", selectedSong)
        formData.append("name", values.name)
        formData.append("filmID", values.filmID)


        postUpcomingSong(formData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `detail added successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        buttonRef.current.style.background = '#1976D2';
        buttonRef.current.textContent = 'Upload File';

        setSelectedSong(null)
        actions.resetForm()
    }


    const formik = useFormik({
        initialValues: {
            song: '',
            name: '',
            filmID: ''
        },

        
        onSubmit: handleSubmit
    })
  return (
    <>

    <Helmet>
        <title>Add Song</title>
    </Helmet>

    <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>Add Song</h1>
    <form onSubmit={formik.handleSubmit}>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
            <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='filmID' value={formik.values.filmID} id="outlined-basic" label="filmID" variant="outlined" />
            
            <br/>
            <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' value={formik.values.name} id="outlined-basic" label="desc" variant="outlined" />
            
            <br/>
            <Button ref={buttonRef} variant="contained" component="label" >
                Upload File

                <input value={formik.values.video}
                    onChange={(e) => {
                        buttonRef.current.style.background = 'red'
                        buttonRef.current.textContent = e.target.files[0].name;
                        formik.handleChange(e)
                        setSelectedSong(e.target.files[0])
                    }}
                    onBlur={formik.handleBlur} name='audio' type='file' accept="audio/mp3" hidden
                />
            </Button>
            
            <br/>
        </div>
        <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} variant='contained' color='error' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add Song</Button>
    </form>
</>
  )
}

export default AddDetailSong
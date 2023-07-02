import React, { useRef, useState } from 'react'
import { postUpcomingVideo } from '../../../api/requests'
import { useFormik } from 'formik'
import { detailSchema } from '../../../validation/DetailSchema'
import { Button, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet'

const AddDetailVideo = () => {
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [upcomingVideos, setUpcomingVideos] = useState([]);
    const buttonRef = useRef()
    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("video", selectedVideo)
        formData.append("desc", values.desc)
        formData.append("filmID", values.filmID)


        postUpcomingVideo(formData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `detail added successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        buttonRef.current.style.background = '#1976D2';
        buttonRef.current.textContent = 'Upload File';

        setSelectedVideo(null)
        actions.resetForm()
    }


    const formik = useFormik({
        initialValues: {
            video: '',
            desc: '',
            filmID: ''
        },

        validationSchema: detailSchema,
        onSubmit: handleSubmit
    })
    return (
        <>

            <Helmet>
                <title>Add Video</title>
            </Helmet>

            <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>Add Video</h1>
            <form onSubmit={formik.handleSubmit}>

                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='filmID' value={formik.values.filmID} id="outlined-basic" label="filmID" variant="outlined" />
                    {formik.errors.filmID && formik.touched.filmID && (<span>{formik.errors.filmID}</span>)}
                    <br/>
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='desc' value={formik.values.desc} id="outlined-basic" label="desc" variant="outlined" />
                    {formik.errors.desc && formik.touched.desc && (<span>{formik.errors.desc}</span>)}
                    <br/>
                    <Button ref={buttonRef} variant="contained" component="label" >
                        Upload File

                        <input value={formik.values.video}
                            onChange={(e) => {
                                buttonRef.current.style.background = 'red'
                                buttonRef.current.textContent = e.target.files[0].name;
                                formik.handleChange(e)
                                setSelectedVideo(e.target.files[0])
                            }}
                            onBlur={formik.handleBlur} name='video' type='file' accept="video/mp4" hidden
                        />
                    </Button>
                    {formik.errors.video && formik.touched.video && (<span>{formik.errors.video}</span>)}
                    <br/>
                </div>
                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} variant='contained' color='error' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add Video</Button>
            </form>
        </>
    )
}

export default AddDetailVideo
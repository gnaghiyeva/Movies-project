import React, { useEffect, useState } from 'react'
import { useStreamingContext } from '../../../context/StreamingContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editStreaming, getStreamingById } from '../../../api/requests'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { streamingSchema } from '../../../validation/StreamingSchema'

const EditStreaming = () => {
  const [streamings, setStreamings] = useStreamingContext();
  console.log('context', streamings)
  const { id } = useParams()
  // console.log(id);
  const navigate = useNavigate()
  const [streaming, setStreaming] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStreamingById(id).then((res) => {
      setStreaming(res)
      console.log('first', res)
      formik.values.title = res.data.title;
      formik.values.desc = res.data.desc;
      setLoading(false)
    })

  }, [id, loading])


  const handleEdit = async (values, actions) => {
    setStreamings(values)
    await editStreaming(id, values)
    navigate('/admin/streamings')
    actions.resetForm()
  }


  const formik = useFormik({
    initialValues: {
      title: streaming.title,
      desc: streaming.desc,

    },
    validationSchema: streamingSchema,

    onSubmit: handleEdit

  })

  return (
    <>
   {loading ? <div>loading</div> : <form onSubmit={formik.handleSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
         
          <TextField type='text' name='title' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} id="outlined-basic" label="title" variant="outlined" /><br />
          {formik.errors.title && formik.touched.title && (<span>{formik.errors.title}</span>)}

          <TextField type='text' name='desc' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.desc} id="outlined-basic" label="desc" variant="outlined" /><br />
          {formik.errors.desc && formik.touched.desc && (<span>{formik.errors.desc}</span>)}

         
          <Button type='submit' variant='contained' color='success'>Edit</Button>
        </form>}
  </>
  )
}

export default EditStreaming
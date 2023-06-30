import React, { useEffect, useState } from 'react'
import { usePricingStrategy } from '../../../context/PricingStrategy';
import { useNavigate, useParams } from 'react-router-dom';
import { editPricing, getPricingById } from '../../../api/requests';
import { useFormik } from 'formik';
import { pricingStrategySchema } from '../../../validation/PricingStrategySchema';
import { Button, TextField } from '@mui/material';
import Swal from "sweetalert2";

const EditPricingStrategy = () => {
    const [pricingsStrategy, setPricingsStrategy] = usePricingStrategy();
//   console.log('context', pricingsStrategy)
  const { id } = useParams()
  // console.log(id);
  const navigate = useNavigate()
  const [pricingStrategy, setPricingStrategy] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPricingById(id).then((res) => {
        setPricingStrategy(res)
      console.log('first', res)
      formik.values.className = res.data.className;
      formik.values.price = res.data.price;
      formik.values.videoQuality = res.data.videoQuality;
      formik.values.resolution = res.data.resolution;
      formik.values.screen = res.data.screen;
      setLoading(false)
    })

  }, [id, loading])


  const handleEdit = async (values, actions) => {
    setPricingsStrategy(values)
    await editPricing(id, values)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `film edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/admin/pricingStrategy')
    actions.resetForm()
  }


  const formik = useFormik({
    initialValues: {
      className: pricingStrategy.className,
      price: pricingStrategy.price,
      videoQuality: pricingStrategy.videoQuality,
      resolution:pricingStrategy.resolution,
      screen:pricingStrategy.screen,


    },
    validationSchema: pricingStrategySchema,

    onSubmit: handleEdit

  })
  return (
    <>
    {loading ? <div>loading</div> : <form onSubmit={formik.handleSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
          
           <TextField type='text' name='className' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.className} id="outlined-basic" label="className" variant="outlined" /><br />
           {formik.errors.className && formik.touched.className && (<span>{formik.errors.className}</span>)}
 
           <TextField type='number' name='price' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} id="outlined-basic" label="price" variant="outlined" /><br />
           {formik.errors.price && formik.touched.price && (<span>{formik.errors.price}</span>)}

           <TextField type='text' name='videoQuality' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.videoQuality} id="outlined-basic" label="videoQuality" variant="outlined" /><br />
           {formik.errors.videoQuality && formik.touched.videoQuality && (<span>{formik.errors.videoQuality}</span>)}

           <TextField type='text' name='resolution' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resolution} id="outlined-basic" label="resolution" variant="outlined" /><br />
           {formik.errors.resolution && formik.touched.resolution && (<span>{formik.errors.resolution}</span>)}

           <TextField type='number' name='screen' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.screen} id="outlined-basic" label="screen" variant="outlined" /><br />
           {formik.errors.screen && formik.touched.screen && (<span>{formik.errors.screen}</span>)}
 
          
           <Button disabled={formik.isSubmitting || Object.keys(formik.errors).length>0} type='submit' variant='contained' color='success'>Edit</Button>
         </form>}
   </>
  )
}

export default EditPricingStrategy
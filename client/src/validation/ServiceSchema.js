import * as yup from 'yup'

export const serviceSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    title:yup.string().required('name is require'),
    desc:yup.string().required('desc is require'),
   
})
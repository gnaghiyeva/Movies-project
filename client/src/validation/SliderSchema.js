import * as yup from 'yup'

export const sliderSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    name:yup.string().required('name is require'),
   
})
import * as yup from 'yup'

export const contactSchema = yup.object().shape({
    desc:yup.string().required('desc is require'),
    address:yup.string().required('address is require'),
    email:yup.string().email("email is not valid").required('email is reuqire'),
    phone:yup.string().required('phone is required'),
    location:yup.string().required('location is required'),
})
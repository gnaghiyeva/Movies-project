import * as yup from 'yup'

export const contactUserSchema = yup.object().shape({
    name:yup.string().required('name is require'),
    surname:yup.string().required('surname is require'),
    email:yup.string().email().required('email is require'),
    opinions:yup.string().required('opinion is require')
})
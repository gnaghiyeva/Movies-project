import * as yup from 'yup'

export const streamingSchema = yup.object().shape({
    title:yup.string().required('title is require'),
    desc:yup.string().required('desc is require'),
   
})
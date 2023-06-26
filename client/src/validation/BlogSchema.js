import * as yup from 'yup'

export const blogSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    title:yup.string().required('title is require'),
    blockquote:yup.string().required('blockquote is required'),
    author:yup.string().required('author is required'),
    description:yup.string().required('description is required')   
})

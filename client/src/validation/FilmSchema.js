import * as yup from 'yup'

export const filmSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    title:yup.string().min(3, "title must be at least 3 characters").required('title is required'),
    minute:yup.number().required('minute is reuqire'),
    imdb:yup.number().positive("imdb cannot be negative number").required('imdb is required'),
    quality:yup.string().required('quality is required'),
    category:yup.string().required('category is required')
   
})
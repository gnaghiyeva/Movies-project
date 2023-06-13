import * as yup from 'yup'

export const filmSchema = yup.object().shape({
    image:yup.string().required('image is require'),
    title:yup.string().required('name is require'),
    minute:yup.number().required('minute is reuqire'),
    imdb:yup.number().required('imdb is required'),
    quality:yup.string().required('quality is required'),
    category:yup.string().required('category is required')
   
})
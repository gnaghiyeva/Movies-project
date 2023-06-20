import * as yup from 'yup'

export const detailSchema = yup.object().shape({
    video:yup.string().required('video is require'),
    desc:yup.string().required('desc is require'),
})
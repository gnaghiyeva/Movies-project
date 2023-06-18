import * as yup from 'yup'

export const pricingStrategySchema = yup.object().shape({
    className:yup.string().required('name is require'),
    videoQuality:yup.string().required('quality is require'),
    price:yup.number().required('price is require'),
    resolution:yup.string().required('resolution is require'),
    screen:yup.number().required('screen is require'),
   
})
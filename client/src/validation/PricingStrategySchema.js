import * as yup from 'yup'

export const pricingStrategySchema = yup.object().shape({
    className:yup.string().required('name is require'),
    videoQuality:yup.string().required('quality is require'),
    price:yup.number().positive("price cannot be negative number").required('price is require'),
    resolution:yup.string().required('resolution is require'),
    screen:yup.number().positive("screen cannot be negative number").required('screen is require'),
   
})
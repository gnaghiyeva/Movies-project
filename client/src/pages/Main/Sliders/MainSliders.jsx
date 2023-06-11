import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../../../App.css";
import { getAllSliders } from '../../../api/requests';
const MainSliders = () => {
    const [sliders,setSliders] = useState([]);
    useEffect(()=>{
       getAllSliders().then((res)=>{
        setSliders(res.data)
        console.log(res.data)
       })
    },[])
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {sliders && sliders.map((slider)=>{
        return(
            <SwiperSlide key={slider._id}>
            <img src={slider.image} alt='films'/>
            </SwiperSlide>
        )
      })}
  </Swiper>
  )
}

export default MainSliders
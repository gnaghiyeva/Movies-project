import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../../../../App.css";
import { getAllPricingSliders } from '../../../../api/requests';
import { Link } from 'react-router-dom';

const MovieSlider = () => {
    const [pricingSliders,setPricingSliders] = useState([]);
    useEffect(()=>{
       getAllPricingSliders().then((res)=>{
        setPricingSliders(res.data)
        console.log(res.data)
       })
    },[])
  return (
    <Swiper style={{ width: '100%' }} navigation={true} modules={[Navigation]} className="mySwiper">
    {pricingSliders && pricingSliders.map((pricingSlider) => (
      <SwiperSlide key={pricingSlider._id} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${pricingSlider.image})` ,backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <article style={{textAlign:'center', padding:'300px 40px'}}>
        <h1 style={{color:'white', fontWeight:'900', fontSize:'60px',lineHeight: '1.2'}}>OUR MOVIES</h1>
        <h4 style={{color:'white'}}><Link to='/' style={{color:'yellow'}}>HOME</Link> &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;  OUR MOVIES</h4>
        
       
        </article>
      </SwiperSlide>
    ))}
  </Swiper>
  )
}

export default MovieSlider
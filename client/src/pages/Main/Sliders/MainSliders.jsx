import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../../../App.css";
import { getAllSliders } from '../../../api/requests';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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
      {sliders && sliders.map((slider) => (
        <SwiperSlide key={slider._id} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slider.image})` ,backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <article style={{textAlign:'left', padding:'300px 40px'}}>
          <h3 style={{color:'yellow'}}>MOVFLX</h3>
          <h1 style={{color:'white', fontWeight:'900', fontSize:'60px',lineHeight: '1.2'}}>Unlimited Movie, TVs <br/> Shows, & More.</h1>
          <Button variant='contained'  style={{backgroundColor:'transparent', border:'1px solid yellow', borderRadius:'25px',color:'white'}}  onMouseEnter={(e) => {
    e.target.style.backgroundColor = 'yellow';
    e.target.style.color = 'black';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = 'white';
  }}>
           <PlayArrowIcon/> WATCH NOW
          </Button>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MainSliders
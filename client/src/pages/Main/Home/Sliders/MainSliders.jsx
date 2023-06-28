import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../../../../App.css";

import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { getAllSliders } from '../../../../api/requests';
import { Link } from 'react-router-dom'
import sliderStyle from '../../../../assets/styles/slider.module.css'

const MainSliders = () => {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    getAllSliders().then((res) => {
      setSliders(res.data)
      console.log(res.data)
    })
  }, [])
  return (
    <Swiper style={{ width: '100%' }} navigation={true} modules={[Navigation]} className="mySwiper">
      {sliders && sliders.map((slider) => (
        <SwiperSlide key={slider._id} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slider.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <article className={sliderStyle.slider_article}>
            <h3 className={sliderStyle.slider_article_h3}>MOVFLX</h3>
            <h1 className={sliderStyle.slider_article_h1}>Unlimited Movie, TVs <br /> Shows, & More.</h1>
            <Button variant='contained' style={{ backgroundColor: 'transparent', border: '1px solid yellow', borderRadius: '25px', color: 'white' }} onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'yellow';
              e.target.style.color = 'black';
            }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}>
              <PlayArrowIcon /> <Link style={{ color: 'black' }} to='/movie'>WATCH NOW</Link>
            </Button>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MainSliders
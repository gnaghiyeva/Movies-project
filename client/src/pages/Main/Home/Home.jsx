import React from 'react'
import MainSliders from './Sliders/MainSliders'
import MainFilms from './Films/MainFilms'
import MainServices from './Services/MainServices'
import MainMovies from './Movies/MainMovies'
import MainStreaming from './Streaming/MainStreaming'
import Recently from './Recently/Recently'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <>

      <Helmet>
        <title>Home</title>
      </Helmet>
      
      <MainSliders />
      <MainFilms />
      <MainServices />
      <MainMovies />
      <MainStreaming />
      <Recently />
    </>
  )
}

export default Home
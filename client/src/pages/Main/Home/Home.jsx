import React from 'react'
import MainSliders from './Sliders/MainSliders'
import MainFilms from './Films/MainFilms'
import MainServices from './Services/MainServices'
import MainMovies from './Movies/MainMovies'
import MainStreaming from './Streaming/MainStreaming'
import Recently from './Recently/Recently'
import HomeContact from './HomeContact/HomeContact'

const Home = () => {
  return (
    <>
    <MainSliders/>
    <MainFilms/>
    <MainServices/>
    <MainMovies/>
    <MainStreaming/>
    <Recently/>
    <HomeContact/>
    </>
  )
}

export default Home
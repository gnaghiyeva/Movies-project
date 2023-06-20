import React from 'react'
import MovieContact from './MovieContact/MovieContact'
import NewMovie from './NewMovies/NewMovie'
import MovieSlider from './MovieSlider/MovieSlider'

const Movie = () => {
  return (
    <>
      <MovieSlider />
      <NewMovie />
      <MovieContact />
    </>
  )
}

export default Movie
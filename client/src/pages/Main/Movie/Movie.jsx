import React from 'react'
import NewMovie from './NewMovies/NewMovie'
import MovieSlider from './MovieSlider/MovieSlider'
import { Helmet } from 'react-helmet'

const Movie = () => {
  return (
    <>

      <Helmet>
        <title>New Movies</title>
      </Helmet>
      <MovieSlider />
      <NewMovie />

    </>
  )
}

export default Movie
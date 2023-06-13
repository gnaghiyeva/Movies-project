import React, { useContext, useState,createContext } from 'react'

const FilmContext = createContext();

export const FilmContextProvider = ({children}) => {
    const [sliders,setSLiders] = useState([])
  return (
    <FilmContext.Provider value={[sliders,setSLiders]}>
        {children}
    </FilmContext.Provider>
  )
}

export const useFilmContext = () => useContext(FilmContext)
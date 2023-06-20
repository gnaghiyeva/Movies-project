import React, { createContext, useContext, useState } from 'react'

const DetailContext = createContext();

export const DetailContextProvider = ({children}) => {
    const [upcomingVideos,setUpcomingVideos] = useState([])
  return (
    <DetailContext.Provider value={[upcomingVideos,setUpcomingVideos]}>
        {children}
    </DetailContext.Provider>
  )
}

export const useDetailContext = () => useContext(DetailContext)
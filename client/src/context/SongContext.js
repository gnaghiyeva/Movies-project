import React, { createContext, useContext, useState } from 'react'

const SongContext = createContext();
export const SongContextProvider = ({ children }) => {
    const [upcomingSongs, setUpcomingSOngs] = useState([])
    return (
        <SongContext.Provider value={[upcomingSongs, setUpcomingSOngs]}>
            {children}
        </SongContext.Provider>
    )
}

export const useSongContext = () => useContext(SongContext)
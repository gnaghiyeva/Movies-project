import React, { useContext, useState,createContext } from 'react'

const StreamingContext = createContext();

export const StreamingContextProvider = ({children}) => {
    const [streamings,setStreamings] = useState([])
  return (
    <StreamingContext.Provider value={[streamings,setStreamings]}>
        {children}
    </StreamingContext.Provider>
  )
}

export const useStreamingContext = () => useContext(StreamingContext)
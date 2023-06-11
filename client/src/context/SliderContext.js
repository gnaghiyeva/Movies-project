import React, { useContext, useState,createContext } from 'react'

const SliderContext = createContext();

export const SliderContextProvider = ({children}) => {
    const [sliders,setSLiders] = useState([])
  return (
    <SliderContext.Provider value={[sliders,setSLiders]}>
        {children}
    </SliderContext.Provider>
  )
}

export const useSliderContext = () => useContext(SliderContext)
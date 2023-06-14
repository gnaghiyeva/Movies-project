import { BASE_URL } from "./base_url";
import axios from 'axios'

//register
export const signUp = (payload)=>{
    axios.post(`${BASE_URL}/register`,payload)
}

//login
export const signIn = async(payload)=>{
    const response =  await axios.post(`${BASE_URL}/login`,payload);
    return response.data;
}

//users
export const getUsers = async(token)=>{
    let users;
    await axios.get(`${BASE_URL}/users`,{
        headers: {
            'x-access-token': token
        }
    }).then((res)=>{
        users = res.data;
    })
    return users;
}


//sliders

export const getAllSliders = async(name)=>{
    let URL
    let globalData

    if(!name){
        URL = BASE_URL+ "/sliders"
    }
    else{
        URL = BASE_URL + "/sliders/"+`?name=${name}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getSliderById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/sliders/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteSlider = async(id)=>{
   let deletedSlider
    await axios.delete(`${BASE_URL}/sliders/${id}`).then((res)=>{
        deletedSlider=res.data
    })
    return deletedSlider
}

export const editSlider = (id,updatedSlider)=>{
   axios.put(`${BASE_URL}/sliders/${id}`,updatedSlider)
}

export const postSlider = (newSlider)=>{
    axios.post(`${BASE_URL}/sliders`,newSlider)
}


//films

export const getAllFilms = async(title)=>{
    let URL
    let globalData

    if(!title){
        URL = BASE_URL+ "/films"
    }
    else{
        URL = BASE_URL + "/films/"+`?title=${title}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getFilmById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/films/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteFilm = async(id)=>{
   let deletedFilm
    await axios.delete(`${BASE_URL}/films/${id}`).then((res)=>{
        deletedFilm=res.data
    })
    return deletedFilm
}

export const editFilm = (id,updatedFilm)=>{
   axios.put(`${BASE_URL}/films/${id}`,updatedFilm)
}

export const postFilm = (newFilm)=>{
    axios.post(`${BASE_URL}/films`,newFilm)
}


//services


export const getAllServices = async(title)=>{
    let URL
    let globalData

    if(!title){
        URL = BASE_URL+ "/services"
    }
    else{
        URL = BASE_URL + "/services/"+`?title=${title}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getServiceById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/services/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteService = async(id)=>{
   let deletedService
    await axios.delete(`${BASE_URL}/services/${id}`).then((res)=>{
        deletedService=res.data
    })
    return deletedService
}

export const editService = (id,updatedService)=>{
   axios.put(`${BASE_URL}/services/${id}`,updatedService)
}

export const postService = (newService)=>{
    axios.post(`${BASE_URL}/services`,newService)
}
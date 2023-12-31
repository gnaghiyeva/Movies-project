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



//streaming
export const getAllStreamings = async(title)=>{
    let URL
    let globalData

    if(!title){
        URL = BASE_URL+ "/streamings"
    }
    else{
        URL = BASE_URL + "/streamings/"+`?title=${title}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getStreamingById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/streamings/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const editStreaming = (id,updatedStreaming)=>{
   axios.put(`${BASE_URL}/streamings/${id}`,updatedStreaming)
}






//pricing plans

export const getAllPricings = async(className)=>{
    let URL
    let globalData

    if(!className){
        URL = BASE_URL+ "/pricings"
    }
    else{
        URL = BASE_URL + "/pricings/"+`?classname=${className}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getPricingById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/pricings/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}



export const editPricing = (id,updatedPricing)=>{
   axios.put(`${BASE_URL}/pricings/${id}`,updatedPricing)
}

//pricingSliders



export const getAllPricingSliders = async(name)=>{
    let URL
    let globalData

    if(!name){
        URL = BASE_URL+ "/pricingSliders"
    }
    else{
        URL = BASE_URL + "/pricingSliders/"+`?name=${name}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getPricingSliderById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/pricingSliders/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deletePricingSlider = async(id)=>{
   let deletedPricingSlider
    await axios.delete(`${BASE_URL}/pricingSliders/${id}`).then((res)=>{
        deletedPricingSlider=res.data
    })
    return deletedPricingSlider
}

export const editPricingSlider = (id,updatedPricingSlider)=>{
   axios.put(`${BASE_URL}/pricingSliders/${id}`,updatedPricingSlider)
}

export const postPricingSlider = (newPricingSlider)=>{
    axios.post(`${BASE_URL}/pricingSliders`,newPricingSlider)
}




//upcomingVideos
export const getAllUpcomingVideos = async(desc)=>{
    let URL
    let globalData

    if(!desc){
        URL = BASE_URL+ "/upcomingvideos"
    }
    else{
        URL = BASE_URL + "/upcomingvideos/"+`?desc=${desc}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getUpcomingVideoById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/upcomingvideos/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteUpcomingVideo = async(id)=>{
   let deletedUpcomingVideo
    await axios.delete(`${BASE_URL}/upcomingvideos/${id}`).then((res)=>{
        deletedUpcomingVideo=res.data
    })
    return deletedUpcomingVideo
}

export const editUpcomingVideo = (id,updatedUpcomingVideo)=>{
   axios.put(`${BASE_URL}/upcomingvideos/${id}`,updatedUpcomingVideo)
}

export const postUpcomingVideo = (newUpcomingVideo)=>{
    axios.post(`${BASE_URL}/upcomingvideos`,newUpcomingVideo)
}



//contact

export const getAllContacts = async(address)=>{
    let URL
    let globalData

    if(!address){
        URL = BASE_URL+ "/contact"
    }
    else{
        URL = BASE_URL + "/contact/"+`?address=${address}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getContactById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/contact/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}



export const editContact = (id,updatedContact)=>{
   axios.put(`${BASE_URL}/contact/${id}`,updatedContact)
}





//blogs
export const getAllBlogs = async(title)=>{
    let URL
    let globalData

    if(!title){
        URL = BASE_URL+ "/blogs"
    }
    else{
        URL = BASE_URL + "/blogs/"+`?title=${title}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getBlogById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/blogs/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteBlog = async(id)=>{
   let deletedBlog
    await axios.delete(`${BASE_URL}/blogs/${id}`).then((res)=>{
        deletedBlog=res.data
    })
    return deletedBlog
}

export const editBlog = (id,updatedBlog)=>{
   axios.put(`${BASE_URL}/blogs/${id}`,updatedBlog)
}

export const postBlog = (newBlog)=>{
    axios.post(`${BASE_URL}/blogs`,newBlog)
}


//contact-users
export const getAllContactUsers = async(name)=>{
    let URL
    let globalData

    if(!name){
        URL = BASE_URL+ "/contactUsers"
    }
    else{
        URL = BASE_URL + "/contactUsers/"+`?name=${name}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getContactUserById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/contactUsers/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const editContactUser = (id,updatedContactUser)=>{
   axios.put(`${BASE_URL}/contactUsers/${id}`,updatedContactUser)
}

export const deleteContactUser = async(id)=>{
    let deletedContactUser
     await axios.delete(`${BASE_URL}/contactUsers/${id}`).then((res)=>{
        deletedContactUser=res.data
     })
     return deletedContactUser
 }

export const postContactUser = (newContactUser) => {
  axios.post(`${BASE_URL}/contactUsers`, newContactUser)
    .then((response) => {
      console.log('Data gönderildi:', response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};




//upcomingSongs
export const getAllUpcomingSongs = async(name)=>{
    let URL
    let globalData

    if(!name){
        URL = BASE_URL+ "/upcomingsongs"
    }
    else{
        URL = BASE_URL + "/upcomingsongs/"+`?name=${name}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getUpcomingSongById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/upcomingsongs/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteUpcomingSong = async(id)=>{
   let deletedUpcomingSong
    await axios.delete(`${BASE_URL}/upcomingsongs/${id}`).then((res)=>{
        deletedUpcomingSong=res.data
    })
    return deletedUpcomingSong
}

export const editUpcomingSong = (id,updatedUpcomingSong)=>{
   axios.put(`${BASE_URL}/upcomingsongs/${id}`,updatedUpcomingSong)
}

export const postUpcomingSong = (newUpcomingSong)=>{
    axios.post(`${BASE_URL}/upcomingsongs`,newUpcomingSong)
}

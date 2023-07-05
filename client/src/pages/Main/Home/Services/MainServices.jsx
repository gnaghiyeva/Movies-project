import {Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import serviceStyle from '../../../../assets/styles/services.module.css'
import { getAllServices } from '../../../../api/requests'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import serviceLogo from '../../../../assets/images/services_img.jpg'
import RemoveIcon from '@mui/icons-material/Remove';
import downloadimage from '../../../../assets/images/services_img.jpg'

const MainServices = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        getAllServices().then((res) => {
            setServices(res.data)
        })
    })
    return (

        <section className={serviceStyle.service_container}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={7} lg={7} >
                    <div className={serviceStyle.service_img_container}>
                        <img className={serviceStyle.service_img} src={serviceLogo} alt='serviceLogo'  />
                        <a className={serviceStyle.service_button}  href={downloadimage} type='button' download="MyExampleDoc" target='_blank' >Download</a>
                    </div>
                </Grid>

                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <article className={serviceStyle.services_article}>
                        <h4> <RemoveIcon style={{color:'yellow'}}/> OUR SERVICES</h4>
                        <h1 style={{fontSize:'36px'}}>Download Your Shows Watch Offline.</h1>
                        <p>Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod tempor.There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some injected humour.</p>
                    </article>

                    <div >
                      {services && services.map((service)=>{
                        return (
                        <Card key={service._id} sx={{ display: 'flex', backgroundColor: 'transparent', border:'none' }}>
                            <CardMedia className={serviceStyle.circularImageWrapper}    style={{ borderRadius: '16px' }}
                                component="img"
                                sx={{ width: 151 }}
                                image={service.image}
                                alt="Live from space album cover"
                            />
                            <Box style={{backgroundColor:'transparent'}} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent  sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5" style={{color:'white'}}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" style={{color:'white'}}>
                                        {service.desc}
                                    </Typography>
                                </CardContent>
                                
                            </Box>
                            
                        </Card>
                        )
                      })}
                    </div>
                </Grid>

            </Grid>
        </section>
    )
}

export default MainServices
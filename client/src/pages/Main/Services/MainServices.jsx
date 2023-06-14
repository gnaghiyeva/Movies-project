import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import serviceStyle from '../../../assets/styles/services.module.css'
import { getAllServices } from '../../../api/requests'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const MainServices = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        getAllServices().then((res) => {
            setServices(res.data)
        })
    })
    return (

        <section style={{ backgroundColor: '#222', paddingTop: '100px' }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div>
                        <img src='https://themehut.co/wp/movflx/wp-content/uploads/2022/08/services_img.jpg' alt='serviceLogo' />

                        <Button variant='contained' style={{ backgroundColor: 'yellow', color: 'black' }} className={serviceStyle.service_button} >Download</Button>
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <article className={serviceStyle.services_article}>
                        <h4>OUR SERVICES</h4>
                        <h1>Download Your Shows Watch Offline.</h1>
                        <p>Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod tempor.There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some injected humour.</p>
                    </article>

                    <div >
                      {services && services.map((service)=>{
                        return (
                        <Card sx={{ display: 'flex', backgroundColor: 'transparent', border:'none' }}>
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
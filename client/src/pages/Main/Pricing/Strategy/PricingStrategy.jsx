import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card } from 'antd';
import { Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { getAllPricings } from '../../../../api/requests';
import Fade from 'react-awesome-reveal';
const PricingStrategy = () => {
    const [pricings, setPricings] = useState([])

    useEffect(() => {
        getAllPricings().then((res) => {
            setPricings(res.data)
        })
    })
    return (
        <section style={{ backgroundColor: 'rgb(22,23,30)', paddingBottom: '60px', paddingTop: '60px' }}>
            <article style={{ textAlign: 'center', display:'flex', flexDirection:'column' }}>
                <span style={{ color: 'yellow' }}>OUR PRICING PLANS</span>
                <h1 style={{ color: 'white', fontSize: '36px' }}>Our Pricing Strategy</h1>
               
            </article>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', padding:'40px 0' }}>
                {pricings && pricings.map((pricing) => {
                    return (

                        <Grid item xs={12} md={3}>
                            <Fade>
                                <Card style={{
                                    textAlign: 'center', backgroundColor: '#222', color: 'white', position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'box-shadow 0.3s ease',
                                    boxShadow: 'none',
                                }} bordered={false}
                                
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.border = '2px solid yellow';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.border = 'none';
                                  }}
                                >
                                    <h2>{pricing.className}</h2>
                                    <span style={{ backgroundColor: 'rgb(228,216,4)', color: 'black', padding: '20px 40px', display: 'inline-block', textAlign: 'center', margin: '0 auto', fontWeight:'900' }}>
                                       <span style={{fontSize:'25px'}}> {pricing.price} $ </span><br />
                                        Monthly
                                    </span>


                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckIcon style={{ marginRight: '5px', marginTop: '5px' }} />
                                            <h3 style={{ margin: '25px 0' }}>Video quality</h3>
                                        </div>

                                        <h3 style={{ margin: '0', marginTop: '5px', color:'yellow' }}>{pricing.videoQuality}</h3>
                                    </div>

                                    <Divider></Divider>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckIcon style={{ marginRight: '5px', marginTop: '5px' }} />
                                            <h3 style={{ margin: '25px 0'}}> Resolution</h3>
                                        </div>

                                        <h3 style={{ margin: '0', marginTop: '5px', color:'yellow' }}>{pricing.resolution}</h3>
                                    </div>

                                    <Divider></Divider>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckIcon style={{ marginRight: '5px', marginTop: '5px' }} />
                                            <h3 style={{ margin: '25px 0' }}> Screens you can watch</h3>
                                        </div>

                                        <h3 style={{ margin: '0', marginTop: '5px', color:'yellow'  }}>{pricing.screen}</h3>
                                    </div>


                                    <Divider></Divider>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <CancelIcon style={{ marginRight: '5px', marginTop: '5px' }} />
                                            <h3 style={{ margin: '15px 0' }}> Cancel anytime</h3>
                                        </div>


                                    </div>

                                </Card>
                            </Fade>
                        </Grid>


                    )
                })}
            </Grid>
        </section>
    );
};

export default PricingStrategy;

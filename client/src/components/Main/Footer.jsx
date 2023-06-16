import { Grid } from '@mui/material'
import React from 'react'
import Movflix from '../../assets/images/logo.png'

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import footerHome from '../../assets/styles/footer.module.css'
import cardsVisa from '../../assets/images/card_img.png'
const Footer = () => {
    return (
        <footer>

            <div className={footerHome.footer} style={{padding:'30px 50px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <ul style={{ color: 'white', listStyle: 'none', lineHeight:'2em' }}>
                            <li><img width={200} src={Movflix} alt='logo' /></li>
                            <li>Movflx Online the relase etras thats sheets continig passag.</li>
                            <li> Address : PO Box W75 Street</li>
                            <li>Phone : +24 1245 654 235</li>
                            <li>Email : info@exemple.com</li>
                        </ul>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <ul style={{ color: 'white', listStyle: 'none', lineHeight:'2.5em'  }}>
                            <li><h2>Categories</h2></li>
                            <li>Action Movies</li>
                            <li>Horror</li>
                            <li>Movies</li>
                            <li>Streaming</li>
                        </ul>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <ul style={{ color: 'white', listStyle: 'none', lineHeight:'2.5em'  }}>
                            <li><h2>Recent Posts</h2></li>
                        </ul>
                    </Grid>

                    

                    <Grid item xs={6} md={3}>

                        <ul style={{ color: 'white', listStyle: 'none' , lineHeight:'2.5em'  }}>
                            <li><h2>Follow us</h2></li>
                            <div style={{display:'flex', gap:'15px'}}>
                            <li><FacebookIcon style={{ color: 'rgb(59,89,152)', fontSize: '45px' }} /></li>
                            <li><TwitterIcon style={{ color: 'rgb(85,172,238)', fontSize: '45px' }} /></li>
                            <li><PinterestIcon style={{ color: 'rgb(215,30,24)', fontSize: '45px' }} /></li>
                            <li><LinkedInIcon style={{ color: 'rgb(21,101,192)', fontSize: '45px' }} /></li>
                            </div>
                        </ul>

                    </Grid>
                </Grid>
            </div>

            <div style={{display:'flex', justifyContent:'space-around', padding:'15px 0', alignItems:'center', backgroundColor:'#222'}}>
                <p style={{color:'gray'}}>Copyright © 2022 All Rights Reserved By Movflx</p>

                <img src={cardsVisa} alt='cards'/>
            </div>
            

        </footer>
    )
}

export default Footer
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Movflix from '../../assets/images/logo.png'

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import footerHome from '../../assets/styles/footer.module.css'
import cardsVisa from '../../assets/images/card_img.png'
import { Link } from 'react-router-dom'
import EditLocationIcon from '@mui/icons-material/EditLocation';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DraftsIcon from '@mui/icons-material/Drafts';
import { getAllBlogs, getAllContacts, getAllFilms } from '../../api/requests';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const Footer = () => {
    const [films, setFilms] = useState([])
    const [allFilms, setAllFilms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getAllContacts().then((res) => {
            setContacts(res.data)
        })
    }, [])
    useEffect(() => {
        getAllBlogs().then((res) => {
            setBlogs(res.data);
        });
    }, []);

    useEffect(() => {
        getAllFilms().then((res) => {
            const formattedFilms = res.data.filter((film) => {
                const releaseDate = new Date(film.releaseDate);
                const currentDate = new Date();
                return releaseDate > currentDate;
            });
            setFilms(formattedFilms);
            setAllFilms(formattedFilms);

            const uniqueCategories = [...new Set(formattedFilms.map((film) => film.category))];
            setCategories(uniqueCategories);
        });
    }, []);

    const lastBlogs = blogs.slice(-2);
    return (
        <footer style={{ width: '100%' }}>

            <div className={footerHome.footer} style={{ padding: '30px 50px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <ul style={{ color: 'white', listStyle: 'none', lineHeight: '2em' }}>
                            <li><img width={200} src={Movflix} alt='logo' /></li>  <br/>
                            {contacts && contacts.map((contact)=>{
                                return (
                                    <>
                                    <li>{contact.desc}</li>
                                    <li> <EditLocationIcon /> Address : {contact.address}</li>
                                    <li><HeadphonesIcon />  Phone : {contact.phone}</li>
                                    <li><DraftsIcon />  Email : {contact.email}</li>
                                    </>
                                )
                            })}
                        </ul>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <ul style={{ color: 'white', listStyle: 'none', lineHeight: '2.5em' }}>
                            <li style={{display:'flex', flexDirection:'column'}}>
                                <h2>Categories</h2>
                                <span style={{borderBottom:'4px solid yellow', width:'15%', borderRadius:'2px'}}></span>
                            </li> <br/>
                            {categories.map((category) => (
                                <li key={category}>{category}</li>
                            ))}
                        </ul>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <ul style={{ color: 'white', listStyle: 'none', lineHeight: '2.5em' }}>
                            <li style={{display:'flex', flexDirection:'column'}}>
                                <h2 >Recent Posts</h2>
                                <span style={{borderBottom:'4px solid yellow', width:'15%', borderRadius:'2px'}}></span>
                            </li> <br/>
                            {lastBlogs && lastBlogs.map((last) => {
                                return (
                                    <Card style={{ backgroundColor: 'transparent' }} sx={{ maxWidth: 345, display: 'flex' }} >
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 151 }}
                                            image={last.image}
                                            alt="Live from space album cover"
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }} style={{ color: 'white' }}>
                                                <Typography component="div" variant="h5">
                                                    {last.title}
                                                </Typography>
                                                <Typography style={{ color: 'white', display: 'flex', alignItems: 'center' }} variant="subtitle1" color="text.secondary" component="div">
                                                    <AccessTimeIcon style={{ color: 'yellow' }} /> {last.releaseDate}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                )
                            })}
                        </ul>
                    </Grid>



                    <Grid item xs={12} sm={6} md={3}>

                        <ul style={{ color: 'white', listStyle: 'none', lineHeight: '2.5em' }}>
                            <li style={{display:'flex', flexDirection:'column'}}>
                                <h2>Follow us</h2>
                                <span style={{borderBottom:'4px solid yellow', width:'15%', borderRadius:'2px'}}></span>
                            </li> <br/>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <li><Link to='https://www.facebook.com/profile.php?viewas=100000686899395&id=100094180459231'><FacebookIcon style={{ color: 'rgb(59,89,152)', fontSize: '45px' }} /></Link></li>
                                <li><Link to='https://twitter.com/MovFlix_studio'><TwitterIcon style={{ color: 'rgb(85,172,238)', fontSize: '45px' }} /></Link></li>
                                <li><Link to='https://in.pinterest.com/ColorsTv/'><PinterestIcon style={{ color: 'rgb(215,30,24)', fontSize: '45px' }} /></Link></li>
                                <li><Link to='https://www.linkedin.com/company/colorstv'><LinkedInIcon style={{ color: 'rgb(21,101,192)', fontSize: '45px' }} /></Link></li>
                            </div>
                        </ul>

                    </Grid>
                </Grid>
            </div>

            <div style={{ padding: '15px 40px', backgroundColor: '#222' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ color: 'gray', margin: 0 }}>Copyright © 2022 All Rights Reserved By Movflx</p>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <img src={cardsVisa} alt='cards' />
                    </Grid>
                </Grid>
            </div>
        </footer>

    )
}

export default Footer
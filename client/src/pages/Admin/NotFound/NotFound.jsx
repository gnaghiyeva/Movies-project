import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import notFoundStyle from '../../../assets/styles/notFound.module.css'
import { Helmet } from 'react-helmet';
const primary = purple[500]; // #f44336
const NotFound = () => {
    return (
        <>

            <Helmet>
                <title>Not Found</title>
            </Helmet>

            <Box

                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: primary,
                }}


            >

                <div className={notFoundStyle.oops_container}>
                    <div className={notFoundStyle.oops_circle}>
                        <div className={notFoundStyle.oops_inner_circle}>
                            <div className={notFoundStyle.oops_text}>Oops</div>
                        </div>
                    </div>
                </div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    404 . Page not found
                </Typography>
                <p style={{ color: 'white', textAlign: 'center' }}>The page you are looking for might have been removed had <br /> its name changed or is temporarily unavailable.</p>
                <Button variant="contained"><Link style={{ color: 'white' }} to='/admin'>Back Home</Link></Button>

            </Box>

        </>
    )
}

export default NotFound
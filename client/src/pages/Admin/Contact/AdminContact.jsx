import React, { useEffect, useState } from 'react'
import { getAllContacts } from '../../../api/requests'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Helmet } from 'react-helmet';


const AdminContact = () => {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getAllContacts().then((res) => {
            setContacts(res.data)
        })
    }, [contacts])

    return (
        <>

            <Helmet>
                <title>Admin Contact</title>
            </Helmet>
            <TableContainer component={Paper} wi>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>Description</b></TableCell>
                            <TableCell align="center"><b>Address</b></TableCell>
                            <TableCell align="center"><b>Email</b></TableCell>
                            <TableCell align="center"><b>Phone</b></TableCell>
                            <TableCell align="center"><b>Location</b></TableCell>
                            <TableCell align="center"><b>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow
                                key={contact._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="center">{contact.desc}</TableCell>
                                <TableCell align="center">{contact.address}</TableCell>
                                <TableCell align="center">{contact.email}</TableCell>
                                <TableCell align="center">{contact.phone}</TableCell>
                                <TableCell align="center">{contact.location}</TableCell>

                                <TableCell align="center"> <Button variant='contained'>
                                    <Link style={{ color: 'white' }} to={`/admin/contact/edit/${contact._id}`}>Edit  <EditIcon /></Link>
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        // <Grid container spacing={2}>
        //     {contacts && contacts.map((contact) => {
        //         return (
        //             <Grid item xs={8}>
        //                 <Card sx={{ maxWidth: 345 }}>
        //                     <CardContent>
        //                         <Typography gutterBottom variant="h5" component="div">
        //                             {contact.email}
        //                         </Typography>
        //                         <Typography variant="body2" color="text.secondary">
        //                             {contact.location}
        //                         </Typography>
        //                         <Typography variant="body2" color="text.secondary">
        //                             {contact.desc}
        //                         </Typography>
        //                     </CardContent>
        //                     <CardActions>
        //                         <Button size="small">{contact.phone}</Button>
        //                         <Button size="small">{contact.address}</Button>
        //                     </CardActions>
        //                 </Card>
        //             </Grid>

        //         )
        //     })}

        // </Grid>

    )
}

export default AdminContact
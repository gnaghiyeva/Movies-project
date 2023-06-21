import React, { useEffect, useState } from 'react'
import { getAllContacts } from '../../../api/requests'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const AdminContact = () => {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getAllContacts().then((res) => {
            setContacts(res.data)
        })
    }, [contacts])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                       
                        <TableCell align="center"><b>desc</b></TableCell>
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
    )
}

export default AdminContact
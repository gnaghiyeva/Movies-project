import React, { useEffect, useState } from 'react'
import { deleteContactUser, getAllContactUsers } from '../../../api/requests'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Helmet } from 'react-helmet';


const ContactUsers = () => {
    const [contactUsers, setContactUsers] = useState([])
    useEffect(() => {
      getAllContactUsers().then((res) => {
        setContactUsers(res.data)
        console.log(res.data)
      })
    }, [contactUsers])
  return (
    <>

    <Helmet>
      <title>Admin Users</title>
    </Helmet>


    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Surname</b></TableCell>
                <TableCell align="center"><b>Email</b></TableCell>
                <TableCell align="center"><b>Opinions</b></TableCell>
                <TableCell align="center"><b>Delete</b></TableCell>
                <TableCell align="center"><b>Edit</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactUsers.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.surname}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.opinions}</TableCell>

                  <TableCell align="center"><Button variant='contained' color='success' onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteContactUser(user._id).then((res) => {
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )

                        })
                        setContactUsers(contactUsers.filter((x) => x._id !== user._id))

                      }
                    })
                  }}>
                    Delete
                    <DeleteIcon />
                  </Button>

                  </TableCell>
                  <TableCell align="center"> <Button variant='contained'>
                    <Link style={{ color: 'white' }} to={`/admin/contactUser/edit/${user._id}`}>Edit<EditIcon /></Link>

                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  </>
  )
}

export default ContactUsers
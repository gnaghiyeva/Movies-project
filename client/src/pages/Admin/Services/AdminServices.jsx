import React, { useEffect, useState } from 'react'
import { deleteService, getAllServices } from '../../../api/requests'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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


const AdminServices = () => {
  const [services, setServices] = useState([])
  useEffect(() => {
    getAllServices().then((res) => {
      setServices(res.data)
      console.log(res.data)
    })
  }, [services])
  return (
    <>

      <Helmet>
        <title>Admin Services</title>
      </Helmet>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Film Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to='/admin/add-service'>Add Service</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Image</b></TableCell>
                  <TableCell align="center"><b>Title</b></TableCell>
                  <TableCell align="center"><b>Description</b></TableCell>
                  <TableCell align="center"><b>Delete</b></TableCell>
                  <TableCell align="center"><b>Edit</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((service) => (
                  <TableRow
                    key={service._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img width={200} src={service.image} alt='logo' />

                    </TableCell>
                    <TableCell align="center">{service.title}</TableCell>
                    <TableCell align="center">{service.desc}</TableCell>
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
                          deleteService(service._id).then((res) => {
                            Swal.fire(
                              'Deleted!',
                              'Your file has been deleted.',
                              'success'
                            )

                          })
                          setServices(services.filter((x) => x._id !== service._id))

                        }
                      })
                    }}>
                      Delete
                      <DeleteIcon />
                    </Button>

                    </TableCell>
                    <TableCell align="center"> <Button variant='contained'>
                      <Link style={{ color: 'white' }} to={`/admin/service/edit/${service._id}`}>Edit<EditIcon /></Link>

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

export default AdminServices
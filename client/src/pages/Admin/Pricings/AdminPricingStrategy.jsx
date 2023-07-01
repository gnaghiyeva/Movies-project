import React, { useEffect, useState } from 'react'
import { getAllPricings } from '../../../api/requests'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Helmet } from 'react-helmet';

const AdminPricingStrategy = () => {
  const [pricingsStrategy, setPricingsStrategy] = useState([])
  useEffect(() => {
    getAllPricings().then((res) => {
      setPricingsStrategy(res.data)
      console.log(res.data)
    })
  }, [pricingsStrategy])

  return (
    <>

      <Helmet>
        <title>Admin Prices</title>
      </Helmet>
      {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Film Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to='/admin/add-film'>Add Pricing Strategy</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}


      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Classname</b></TableCell>
                  <TableCell align="center"><b>Price</b></TableCell>
                  <TableCell align="center"><b>Video Quality</b></TableCell>
                  <TableCell align="center"><b>Resolution</b></TableCell>
                  <TableCell align="center"><b>Screens</b></TableCell>
                  <TableCell align="center"><b>Edit</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pricingsStrategy.map((pricingStrategy) => (
                  <TableRow
                    key={pricingStrategy._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pricingStrategy.className}

                    </TableCell>
                    <TableCell align="center">{pricingStrategy.price}</TableCell>
                    <TableCell align="center">{pricingStrategy.videoQuality}</TableCell>
                    <TableCell align="center">{pricingStrategy.resolution}</TableCell>
                    <TableCell align="center">{pricingStrategy.screen}</TableCell>

                    <TableCell align="center"> <Button variant='contained'>
                      <Link style={{ color: 'white' }} to={`/admin/pricingStrategy/edit/${pricingStrategy._id}`}>Edit  <EditIcon /></Link>

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

export default AdminPricingStrategy
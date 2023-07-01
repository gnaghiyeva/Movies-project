import React, { useEffect, useState } from 'react'
import { deleteFilm, getAllFilms } from '../../../api/requests'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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





const AdminFilms = () => {
  const [films, setFilms] = useState([])
  useEffect(() => {
    getAllFilms().then((res) => {
      setFilms(res.data)
      console.log(res.data)
    })
  }, [films])

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Film Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to='/admin/add-film'>Add Film</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Grid container spacing={2}>
            <Grid item xs={12} md={12}>

              {/* <Card style={{backgroundColor:'#222', color:'white'}}>
                <Image src={film.image} wrapped ui={false} />
                <Card.Content>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Header>{film.title}</Card.Header>
                    <Card.Meta>
                      <span className='date' style={{color:'white'}}>{film.releaseDate}</span>
                    </Card.Meta>
                  </div>
                  <br />

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Description>
                      <span style={{ border: '1px solid yellow', padding:'5px 15px'}}>
                        {film.quality}
                      </span>
                    </Card.Description>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <Card.Description>
                        <span style={{display:'flex', alignItems:'center'}}>
                        <AccessTimeIcon/>  {film.minute} min
                        </span>
                      </Card.Description>
                      <Card.Description>
                        <span style={{display:'flex', alignItems:'center'}}>
                          <ThumbUpIcon /> {film.imdb}
                        </span>
                      </Card.Description>

                      <Card.Description>
                        <span style={{color:'red'}}>
                          {film.category}
                        </span>
                      </Card.Description>

                    </div>

                  </div>
                </Card.Content>
                
              <div style={{display:'flex', justifyContent:'center', gap:'20px'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                  <Button variant='outlined' style={{backgroundColor:'red'}} onClick={()=>{
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
                        deleteFilm(film._id).then((res)=>{
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )

                        }) 
                        setFilms(films.filter((x)=> x._id!==film._id))
                        
                      }
                    })
                  }}>
                    Delete
                   <DeleteIcon/>
                  </Button>
                  </div>


                  <div style={{display:'flex', alignItems:'center'}}>
                  <Button variant='outlined' style={{backgroundColor:'hotpink'}}>
                  <Link to={`/admin/film/edit/${film._id}`}>Edit  <EditIcon/></Link>
                  
                  </Button>
                  </div>

                  </div>  
              </Card> */}

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                    <TableCell><b>ID</b></TableCell>
                      <TableCell><b>Image</b></TableCell>
                      <TableCell align="center"><b>Title</b></TableCell>
                      <TableCell align="center"><b>Release Date</b></TableCell>
                      <TableCell align="center"><b>Quality</b></TableCell>
                      <TableCell align="center"><b>Minute</b></TableCell>
                      <TableCell align="center"><b>Imdb</b></TableCell>
                      <TableCell align="center"><b>Category</b></TableCell>
                      <TableCell align="center"><b>Delete</b></TableCell>
                      <TableCell align="center"><b>Edit</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {films.map((film) => (
                      <TableRow
                        key={film._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                           <TableCell align="center">{film._id}</TableCell>
                        <TableCell component="th" scope="row">
                          <img width={200} src={film.image} alt='logo'/>
                          
                        </TableCell>
                        <TableCell align="center"><Link to={`/admin/film/${film._id}`}>{film.title}</Link></TableCell>
                        <TableCell align="center">{film.releaseDate}</TableCell>
                        <TableCell align="center">{film.quality}</TableCell>
                        <TableCell align="center">{film.minute}</TableCell>
                        <TableCell align="center">{film.imdb}</TableCell>
                        <TableCell align="center">{film.category}</TableCell>
                        <TableCell align="center"><Button variant='contained' color='success' onClick={()=>{
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
                        deleteFilm(film._id).then((res)=>{
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )

                        }) 
                        setFilms(films.filter((x)=> x._id!==film._id))
                        
                      }
                    })
                  }}>
                    Delete
                   <DeleteIcon/>
                  </Button>
                  
                  </TableCell>
                        <TableCell align="center"> <Button variant='contained'>
                  <Link style={{color:'white'}} to={`/admin/film/edit/${film._id}`}>Edit  <EditIcon/></Link>
                  
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

export default AdminFilms
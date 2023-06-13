import React, { useEffect, useState } from 'react'
import { deleteFilm, getAllFilms } from '../../../api/requests'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Card, Icon, Image } from 'semantic-ui-react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';

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
        {films && films.map((film) => {
          return (
            //   <Grid item xs={6} md={3}>
            //   <Card sx={{ maxWidth: 345 }}>
            //     <CardMedia
            //       sx={{ height: 140 }}
            //       image={film.image}
            //       title="green iguana"
            //     />
            //     <CardContent>
            //         <div style={{display:'flex', justifyContent:'space-between'}}>
            //       <Typography gutterBottom variant="h5" component="div">
            //         {film.title}
            //       </Typography>
            //       <Typography gutterBottom variant="h5" component="div">
            //         {film.releaseDate}
            //       </Typography>
            //       </div>
            //       <Typography gutterBottom variant="h5" component="div">
            //         {film.quality}
            //       </Typography>
            //       <Typography gutterBottom variant="h5" component="div">
            //         {film.minute} min
            //       </Typography>
            //       <Typography gutterBottom variant="h5" component="div">
            //         {film.imdb}
            //       </Typography>


            //     </CardContent>
            //     <CardActions>
            //       <Button size="small" onClick={()=>{
            //         Swal.fire({
            //           title: 'Are you sure?',
            //           text: "You won't be able to revert this!",
            //           icon: 'warning',
            //           showCancelButton: true,
            //           confirmButtonColor: '#3085d6',
            //           cancelButtonColor: '#d33',
            //           confirmButtonText: 'Yes, delete it!'
            //         }).then((result) => {
            //           if (result.isConfirmed) {
            //             deleteFilm(film._id).then((res)=>{
            //               Swal.fire(
            //                 'Deleted!',
            //                 'Your file has been deleted.',
            //                 'success'
            //               )

            //             })
            //             setFilms(films.filter((x)=> x._id!==film._id))
            //           }
            //         })
            //       }}>Delete</Button>
            //       <Button size="small"><Link to={`/admin/film/edit/${film._id}`}>Edit</Link></Button>
            //     </CardActions>
            //   </Card>
            // </Grid>
            <Grid item xs={6} md={3}>

              <Card style={{backgroundColor:'#222', color:'white'}}>
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
              </Card>
            </Grid>
          )
        })}

      </Grid>
    </>
  )
}

export default AdminFilms
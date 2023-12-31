import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { deleteSlider, getAllSliders } from '../../../api/requests';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet';


const AdminSliders = () => {
  const [sliders, setSliders] = useState([])
  useEffect(() => {
    getAllSliders().then((res) => {
      setSliders(res.data)
      console.log(res.data)
    })
  }, [sliders])
  return (
    <>

      <Helmet>
        <title>Admin Sliders</title>
      </Helmet>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Slider Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to='/admin/add-slider'>Add Slider</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <h1 style={{fontFamily:'sans-serif', textAlign:'center'}}>Film Sliders</h1>
      <Grid container spacing={2} style={{padding:'0 40px'}}>
        {sliders && sliders.map((slider) => {
          return (
            <Grid item xs={6} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={slider.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {slider.name}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {
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
                        deleteSlider(slider._id).then((res) => {
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )

                        })
                        setSliders(sliders.filter((x) => x._id !== slider._id))
                      }
                    })
                  }}>Delete</Button>
                  <Button size="small"><Link to={`/admin/slider/edit/${slider._id}`}>Edit</Link></Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}

      </Grid>
    </>
  )
}

export default AdminSliders
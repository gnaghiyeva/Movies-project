import React, { useEffect, useState } from 'react'
import { deletePricingSlider, getAllPricingSliders } from '../../../api/requests';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
const AdminPricings = () => {
    const [pricingSliders,setPricingSliders] = useState([]);
    useEffect(()=>{
       getAllPricingSliders().then((res)=>{
        setPricingSliders(res.data)
        console.log(res.data)
       })
    },[pricingSliders])//pricingSlider
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Slider Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to='/admin/add-pricingSlider'>Add Pricing</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>


<Grid container spacing={2}>
      {pricingSliders && pricingSliders.map((pricingSlider)=>{
        return (
          <Grid item xs={6} md={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={pricingSlider.image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {pricingSlider.name}
              </Typography>
              
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>{
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
                    deletePricingSlider(pricingSlider._id).then((res)=>{
                      Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
  
                    })
                    setPricingSliders(pricingSliders.filter((x)=> x._id!==pricingSlider._id))
                  }
                })
              }}>Delete</Button>
              <Button size="small"><Link to={`/admin/pricingSlider/edit/${pricingSlider._id}`}>Edit</Link></Button>
            </CardActions>
          </Card>
        </Grid>
        )
      })}

      </Grid>
      </>
  )
}

export default AdminPricings
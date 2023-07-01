import React, { useEffect, useState } from 'react';
import { getAllBlogs, getAllFilms, getBlogById } from '../../../../api/requests';
import { Box, Divider, Grid, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

import { BsBlockquoteLeft } from "react-icons/bs";

const BlogDetail = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState({});
  const [blog, setBlog] = useState({})
  const blogsPerPage = 2;
  const { id } = useParams();

  useEffect(() => {
    getAllBlogs().then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const lastBlogs = blogs.slice(-3);

  useEffect(() => {
    getAllFilms().then((res) => {
      setFilms(res.data);
    });
  }, []);

  useEffect(() => {
    getBlogById(id).then((res) => {
      setBlog(res.data);
    });
  }, [id]);

  useEffect(() => {
    const categoryCounts = {};
    films.forEach((film) => {
      if (categoryCounts[film.category]) {
        categoryCounts[film.category]++;
      } else {
        categoryCounts[film.category] = 1;
      }
    });
    setCategories(categoryCounts);
  }, [films]);

  const getCountByCategory = (category) => {
    return categories[category] || 0;
  };


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  function handleChange(e) {
    getAllBlogs(e.target.value).then((res) => {
      setBlogs(res.data)
      console.log(res.data)

    })
  }


  return (
    <section style={{ backgroundColor: 'rgb(16,15,23)', padding: '80px 100px', margin: '0 auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} key={blog._id}>
              <Card style={{ backgroundColor: 'rgb(31,30,36)' }} sx={{ maxWidth: 800 }}>
                <CardMedia sx={{ height: 440 }} image={blog.image} title="green iguana" />
                <CardContent>
                  <Typography style={{ color: 'white' }} variant="body2" color="text.secondary">
                    <AccessTimeIcon style={{ color: 'yellow' }} /> {blog.releaseDate}
                  </Typography>
                  <Typography style={{ color: 'white' }} gutterBottom variant="h5" component="div">
                    <b>{blog.title}</b>
                  </Typography>
                  <p style={{ color: 'white' }}>
                   <BsBlockquoteLeft/> {blog.description}
                  </p>
                </CardContent>
                <Divider style={{ height: '4px', backgroundColor: 'gray' }} />
                <CardActions style={{ backgroundColor: 'rgb(31,30,36)' }}>

                  <MDBContainer className="py-5">
                    <MDBRow className="justify-content-center align-items-center h-100">
                      <MDBCol lg="10" xl="10">
                        <figure className="note note-primary ">
                          <MDBTypography blockquote>
                            <p className="pb-2" style={{color:'white', fontSize:'25px'}}>
                            <i class="bi bi-blockquote-left"></i> <i>{blog.blockquote}</i> 
                            </p>
                          </MDBTypography>
                          <figcaption className="blockquote-footer mb-0" style={{color:'yellow'}}>
                            {blog.author}
                          </figcaption>
                        </figure>
                      </MDBCol>


                    </MDBRow>
                  </MDBContainer>

                </CardActions>
              </Card>
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ backgroundColor: 'rgb(31,30,36)' }} sx={{ maxWidth: 345 }}>

            <CardContent >
              <Typography style={{ color: 'white' }} gutterBottom variant="h5" component="div">
                Search
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center' }}>
                <TextField placeholder='search by title' onChange={(e) => handleChange(e)} sx={{ input: { color: 'white' } }} style={{ backgroundColor: 'rgb(57,57,57)' }} />
                <span style={{ color: 'black', padding: '15px', backgroundColor: 'yellow' }}>
                  <SearchIcon />
                </span>
              </Typography>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: 'rgb(31,30,36)', color: 'white' }} sx={{ maxWidth: 345, marginTop: '20px' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Categories
              </Typography>
              {Object.keys(categories).map((category) => (
                <Typography variant="body2" color="text.secondary" key={category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '15px' }}>
                    <span>
                      {category}
                    </span>
                    <span>
                      ({getCountByCategory(category)})
                    </span>
                  </div>
                  <Divider sx={{ borderColor: 'gray', borderWidth: 2, borderStyle: 'dashed' }} />

                </Typography>
              ))}
            </CardContent>
          </Card>

          <br />
          <h2 style={{ color: 'white' }}>Recent Posts</h2>
          {lastBlogs && lastBlogs.map((last) => {
            return (
              <Card style={{ backgroundColor: 'rgb(31,30,36)' }} sx={{ maxWidth: 345, display: 'flex' }} >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={last.image}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }} style={{ color: 'white' }}>
                    <Typography component="div" variant="h5">
                      <span style={{fontSize:'16px'}}>{last.title}</span>
                    </Typography>
                    <Typography style={{ color: 'white' }} variant="subtitle1" color="text.secondary" component="div">
                     <AccessTimeIcon style={{color:'yellow'}}/> {last.releaseDate}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            )
          })}
        </Grid>
      </Grid>


    </section>
  )
}

export default BlogDetail
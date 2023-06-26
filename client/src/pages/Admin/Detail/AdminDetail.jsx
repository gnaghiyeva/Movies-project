import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Grid from '@mui/material/Grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { deleteUpcomingVideo, getFilmById, getUpcomingVideoById } from '../../../api/requests';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const AdminDetail = () => {
    const [upcomingVideos, setUpcomingVideos] = useState([]);
    const [film, setFilm] = useState({});
    const { id } = useParams();
    
    const currentDate = new Date().getTime();
    const releaseDate = new Date(film.releaseDate).getTime();
    const isFilmReleased = releaseDate <= currentDate;

    useEffect(() => {
        getFilmById(id).then((res) => {
            setFilm(res.data);
        });
    }, [id]);

    // useEffect(() => {
    //     getUpcomingVideoById(id).then((res) => {
    //         setUpcomingVideos(res);
    //     });
    // }, [id]);

    
    useEffect(() => {
        if (isFilmReleased) {
            getUpcomingVideoById(id).then((res) => {
                setUpcomingVideos(res);
            });
        }
    }, [id, isFilmReleased]);


    

    return (
<>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Film Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to='/admin/add-video'>Add Video</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        <section style={{ padding: '60px 50px' }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Card style={{ backgroundColor: '#222', color: 'white' }}>
                        <img src={film.image} height={300} />
                        <Card.Content>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Card.Header>{film.title}</Card.Header>
                                <Card.Meta>
                                    <span className='date' style={{ color: 'white' }}>{film.releaseDate}</span>
                                </Card.Meta>
                            </div>
                            <br />

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Card.Description>
                                    <span style={{ border: '1px solid yellow', padding: '5px 15px' }}>
                                        {film.quality}
                                    </span>
                                </Card.Description>

                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <Card.Description>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <AccessTimeIcon />  {film.minute} min
                                        </span>
                                    </Card.Description>
                                    <Card.Description>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <ThumbUpIcon /> {film.imdb}
                                        </span>
                                    </Card.Description>

                                </div>

                            </div>
                        </Card.Content>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                            </div>




                        </div>
                    </Card>
                </Grid>

                <Grid item xs={6} md={6}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><b>Desc</b></TableCell>
                                    <TableCell align="center"><b>Trailer</b></TableCell>
                                    <TableCell align="center"><b>Delete</b></TableCell>
                                    <TableCell align="center"><b>Edit</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {upcomingVideos.map((upcoming) => (
                                    <TableRow
                                        key={upcoming._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="center">{upcoming.desc}</TableCell>
                                        <TableCell align="center"> 
                                        <video controls width={170} height={100} alt={upcoming.desc}>
                                            {console.log('VIDEO: ', upcoming.video)}
                                            <source src={upcoming.video} type="video/mp4" />
                                            Sorry, your browser doesn't support embedded videos.
                                        </video></TableCell>
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
                                                    deleteUpcomingVideo(upcoming._id).then((res) => {
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success'
                                                        )

                                                    })
                                                    setUpcomingVideos(upcomingVideos.filter((x) => x._id !== upcoming._id))
                                                }
                                            })
                                        }}>
                                            Delete
                                            <DeleteIcon />
                                        </Button>

                                        </TableCell>
                                        <TableCell align="center"> <Button variant='contained'>
                                            <Link style={{ color: 'white' }} to={`/admin/videoDetail/edit/${upcoming._id}`}>Edit  <EditIcon /></Link>
                                        </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </section>
        </>
    )
}

export default AdminDetail
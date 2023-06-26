import React, { useEffect, useState } from 'react'

import { deleteBlog, getAllBlogs } from '../../../api/requests';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTheme } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
const AdminBlog = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        getAllBlogs().then((res) => {
            setBlogs(res.data)
        })
    }, [blogs])
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Film Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home"><Link to='/admin/add-blog'>Add Blog</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Grid container spacing={2}>
        
         

            <Grid item xs={12} md={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                  
                      <StyledTableCell><b>Image</b></StyledTableCell>
                      <StyledTableCell align="center"><b>Title</b></StyledTableCell>
                      <StyledTableCell  align="center"><b>Release Date</b></StyledTableCell>
                      <StyledTableCell  align="center"><b>Blockquote</b></StyledTableCell>
                      <StyledTableCell  align="center"><b>Author</b></StyledTableCell>
                      <StyledTableCell  align="center"><b>Description</b></StyledTableCell>
                      <StyledTableCell align="center"><b>Delete</b></StyledTableCell>
                      <StyledTableCell  align="center"><b>Edit</b></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogs.map((blog) => (
                      <StyledTableRow 
                        key={blog._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                           
                        <StyledTableCell component="th" scope="row">
                          <img width={200} src={blog.image} alt='logo'/>
                          
                        </StyledTableCell>
                        <StyledTableCell align="center">{blog.title}</StyledTableCell>
                        <StyledTableCell align="center">{blog.releaseDate}</StyledTableCell>
                        <StyledTableCell align="center">{blog.blockquote}</StyledTableCell>
                        <StyledTableCell align="center">{blog.author}</StyledTableCell>
                        <StyledTableCell align="center">{blog.description}</StyledTableCell>

                        <StyledTableCell align="center"><Button variant='contained' color='success' onClick={()=>{
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
                        deleteBlog(blog._id).then((res)=>{
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )

                        }) 
                        setBlogs(blogs.filter((x)=> x._id!==blog._id))
                        
                      }
                    })
                  }}>
                    Delete
                   <DeleteIcon/>
                  </Button>
                  
                  </StyledTableCell>
                        <TableCell align="center"> <Button variant='contained'>
                  <Link style={{color:'white'}} to={`/admin/blog/edit/${blog._id}`}>Edit  <EditIcon/></Link>
                  
                  </Button>
                  </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          
      

      </Grid>
            

        </>
    )
}

export default AdminBlog
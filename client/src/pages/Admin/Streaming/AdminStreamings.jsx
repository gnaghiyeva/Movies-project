import React, { useEffect, useState } from 'react'
import { getAllStreamings } from '../../../api/requests'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

const AdminStreamings = () => {
    const [streamings, setStreamings] = useState([])
    useEffect(() => {
      getAllStreamings().then((res) => {
        setStreamings(res.data)
        console.log(res.data)
      })
    }, [streamings])

  return (
    <>


    <Grid container spacing={2}>
          <Grid item xs={12} md={12}>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>Title</b></TableCell>
                    <TableCell align="center"><b>Description</b></TableCell>
                    <TableCell align="center"><b>Video link</b></TableCell>
                    <TableCell align="center"><b>Edit</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {streamings.map((streaming) => (
                    <TableRow
                      key={streaming._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    
                      <TableCell align="center">{streaming.title}</TableCell>
                      <TableCell align="center">{streaming.desc}</TableCell>
                      <TableCell align="center">{streaming.link}</TableCell>
                     
                      <TableCell align="center"><Button variant='contained'>
                <Link style={{color:'white'}} to={`/admin/streaming/edit/${streaming._id}`}>Edit <EditIcon/></Link>
                
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

export default AdminStreamings
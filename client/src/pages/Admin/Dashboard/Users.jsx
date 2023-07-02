import React, { useEffect, useState } from 'react'
import { getAllContactUsers } from '../../../api/requests';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Pagination } from '@mui/material';

const Users = () => {
    const [contactUsers, setContactUsers] = useState([]);
    const [pages, setPages] = useState(1);
    const usersPage = 4;
  
    useEffect(() => {
      getAllContactUsers().then((res) => {
        setContactUsers(res.data);
        console.log(res.data);
      });
    }, [pages]);
  
    const lastUser = pages * usersPage;
    const firstUser = lastUser - usersPage;
    const currentUsers = contactUsers.slice(firstUser, lastUser);
  
    const handleChangePage = (e, page) => {
      setPages(page);
    };
  return (
    <Grid container spacing={2} sx={{ height: '100%', maxWidth: 800, margin: '0 auto' }}>
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
             
              <TableCell align="center">
                <b>Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Surname</b>
              </TableCell>
              <TableCell align="center">
                <b>Email</b>
              </TableCell>
              
              
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user._id}>
                
                <TableCell align="center" size="small">
                  {user.name}
                </TableCell>
                <TableCell align="center" size="small">
                  {user.surname}
                </TableCell>
                <TableCell align="center" size="small">
                  {user.email}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          count={Math.ceil(contactUsers.length/usersPage)}
          page={pages}
          onChange={handleChangePage}
        />
      </TableContainer>
    </Grid>
  </Grid>
  )
}

export default Users
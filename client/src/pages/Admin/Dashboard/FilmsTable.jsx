import React, { useEffect, useState } from 'react';
import { getAllFilms } from '../../../api/requests';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Pagination } from '@mui/material';

const FilmsTable = () => {
  const [films, setFilms] = useState([]);
  const [pages, setPages] = useState(1);
  const filmsPage = 2;

  useEffect(() => {
    getAllFilms().then((res) => {
      setFilms(res.data);
      console.log(res.data);
    });
  }, [pages]);

  const lastFilm = pages * filmsPage;
  const firstFilm = lastFilm - filmsPage;
  const currentFilms = films.slice(firstFilm, lastFilm);

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
                <TableCell>
                  <b>Image</b>
                </TableCell>
                <TableCell align="center">
                  <b>Title</b>
                </TableCell>
                <TableCell align="center">
                  <b>Release Date</b>
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {currentFilms.map((film) => (
                <TableRow key={film._id}>
                  <TableCell component="th" scope="row">
                    <img width={200} src={film.image} alt="logo" />
                  </TableCell>
                  <TableCell align="center" size="small">
                    {film.title}
                  </TableCell>
                  <TableCell align="center" size="small">
                    {film.releaseDate}
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            count={Math.ceil(films.length/filmsPage)}
            page={pages}
            onChange={handleChangePage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default FilmsTable;

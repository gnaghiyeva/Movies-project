import React, { useEffect, useState } from 'react';
import { getAllFilms } from '../../../../api/requests';
import Grid from '@mui/material/Grid';
import { Card, Image } from 'semantic-ui-react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import recentlyFilmStyle from '../../../../assets/styles/recentlyFilms.module.css'
const Recently = () => {
  const [films, setFilms] = useState([]);
  const [allFilms, setAllFilms] = useState([]);

  useEffect(() => {
    getAllFilms().then((res) => {
      const formattedFilms = res.data;

     
      const recentlyAddedFilms = formattedFilms
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 4);

      setAllFilms(formattedFilms);
      setFilms(recentlyAddedFilms);
    });
  }, []);

  return (
    <section className={recentlyFilmStyle.recently_films_container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <article style={{margin:'0 auto', textAlign:'center'}}>
          <span style={{ color: 'yellow' }}>ONLINE STREAMING</span>
          <h1 style={{ color: 'white', fontSize: '36px' }}>RECENTLY ADDED MOVIES</h1>
        </article>
      </div>

      <Grid container spacing={2} style={{padding:'30px 90px'}}>
        {films && films.map((film) => {
            return (
              <Grid item lg={3} md={3} sm={6} xs={12} key={film._id}>
                <Card style={{  backgroundColor: 'transparent', color: 'white', position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease',
                    boxShadow: 'none',
                
                  }} 
                    
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0px 0px 10px 5px rgba(0, 0, 0, 0.95)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                  <img src={film.image} height={300} />
                  <Card.Content>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Card.Header><Link className={recentlyFilmStyle.film_title} to={`/film/${film._id}`}>{film.title}</Link></Card.Header>
                      <Card.Meta>
                        <span className="date" style={{ color: 'yellow' }}>
                          {film.releaseDate.substring(0, 4)}
                        </span>
                      </Card.Meta>
                    </div>
                    <br />

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Card.Description>
                        <span style={{ border: '2px solid gray', padding: '5px 10px', color:'yellow', fontSize:'10px' }}>
                          {film.quality}
                        </span>
                      </Card.Description>

                      <div style={{ display: 'flex', gap: '15px' }}>
                        <Card.Description>
                          <span style={{ display: 'flex', alignItems: 'center', gap:'5px' }}>
                            <AccessTimeIcon style={{color:'yellow',fontSize:'16px'}}  /> {film.minute} min
                          </span>
                        </Card.Description>
                        <Card.Description>
                          <span style={{ display: 'flex', alignItems: 'center', gap:'5px' }}>
                            <ThumbUpIcon style={{color:'yellow',fontSize:'16px'}}  /> {film.imdb}
                          </span>
                        </Card.Description>
                      </div>
                    </div>
                  </Card.Content>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>{/* Ekstralar */}</div>
                  </div>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </section>
  );
};

export default Recently;

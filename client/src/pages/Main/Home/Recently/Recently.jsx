import React, { useEffect, useState } from 'react';
import { getAllFilms } from '../../../../api/requests';
import Grid from '@mui/material/Grid';
import { Card, Image } from 'semantic-ui-react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button } from '@mui/material';

const Recently = () => {
  const [films, setFilms] = useState([]);
  const [allFilms, setAllFilms] = useState([]);

  useEffect(() => {
    getAllFilms().then((res) => {
      const formattedFilms = res.data;

      // Son eklenen 8 filmi al
      const recentlyAddedFilms = formattedFilms
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 4);

      setAllFilms(formattedFilms);
      setFilms(recentlyAddedFilms);
    });
  }, []);

  return (
    <section style={{ backgroundColor: '#222', paddingTop: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <article style={{margin:'0 auto', textAlign:'center'}}>
          <span style={{ color: 'yellow' }}>ONLINE STREAMING</span>
          <h1 style={{ color: 'white', fontSize: '36px' }}>RECENTLY ADDED MOVIES</h1>
        </article>
      </div>

      <Grid container spacing={4} style={{margin:'0 auto'}}>
        {films &&
          films.map((film) => {
            return (
              <Grid item xs={6} md={3} key={film._id}>
                <Card style={{ backgroundColor: '#222', color: 'white' }}>
                  <img src={film.image} height={300} />
                  <Card.Content>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Card.Header>{film.title}</Card.Header>
                      <Card.Meta>
                        <span className="date" style={{ color: 'white' }}>
                          {film.releaseDate}
                        </span>
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
                            <AccessTimeIcon /> {film.minute} min
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

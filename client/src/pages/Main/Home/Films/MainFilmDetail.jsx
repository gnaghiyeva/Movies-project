import React, { useEffect, useState } from 'react';
import { getFilmById, getUpcomingVideoById } from '../../../../api/requests';
import { useParams } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import filmdetail from '../../../../assets/styles/mainFilmDetail.module.css';

const MainFilmDetail = () => {
  const [upcomingVideos, setUpcomingVideos] = useState([]);
  const [film, setFilm] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getFilmById(id).then((res) => {
      setFilm(res.data);
    });
  }, [id]);

  useEffect(() => {
    getUpcomingVideoById(id).then((res) => {
      setUpcomingVideos(res);
    });
  }, [id]);

  const currentDate = new Date().getTime();
  const releaseDate = new Date(film.releaseDate).getTime();
  const isFilmReleased = releaseDate <= currentDate;

  return (
    <>
      <section className={filmdetail.detail} style={{ backgroundColor: '#222', padding: '60px 50px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <Card style={{ backgroundColor: '#222', color: 'white' }}>
              <img src={film.image} height={450} alt={film.title} />
            </Card>
          </Grid>

          <Grid item xs={6} md={6}>
            <article>
              <h2 style={{ color: 'yellow' }}>New Episodes</h2>
              <h1 style={{ color: 'white' }}>{film.title}</h1>
            </article>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <span style={{ border: '1px solid white', padding: '5px 15px', color: 'white' }}>
                {film.quality}
              </span>

              <span style={{ color: 'white' }}>{film.category}</span>

              <span className="date" style={{ color: 'white' }}>
                <CalendarMonthIcon style={{ color: 'yellow' }} /> {film.releaseDate}
              </span>

              <span style={{ color: 'white' }}>
                <AccessTimeIcon style={{ color: 'yellow' }} /> {film.minute} min
              </span>
            </div>

            {isFilmReleased ? (
              upcomingVideos.map((upcoming) => (
                <React.Fragment key={upcoming._id}>
                  <p style={{ color: 'gray' }}>{upcoming.desc}</p>
                  {upcoming.video && (
                    <div>
                      <video controls width={600} height={400}>
                        {console.log('VIDEO: ', upcoming.video)}
                        <source src={upcoming.video} type="video/mp4" />
                        Sorry, your browser doesn't support embedded videos.
                      </video>
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <p style={{ color: 'red',fontSize:'30px' }}>The movie has not been released yet :(</p>
            )}
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default MainFilmDetail;

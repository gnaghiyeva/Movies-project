import React, { useEffect, useState } from 'react';
import { getFilmById, getUpcomingSongById, getUpcomingVideoById } from '../../../../api/requests';
import { useParams } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import filmdetail from '../../../../assets/styles/mainFilmDetail.module.css';

const MainFilmDetail = () => {
  const [upcomingVideos, setUpcomingVideos] = useState([]);
  const [upcomingSongs, setUpcomingSongs] = useState([]);
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

  useEffect(()=>{
    getUpcomingSongById(id).then((res)=>{
      setUpcomingSongs(res)
    })
  })

  const currentDate = new Date().getTime();
  const releaseDate = new Date(film.releaseDate).getTime();
  const isFilmReleased = releaseDate <= currentDate;

  return (
    <>
      <section className={filmdetail.detail}>
        <Grid container spacing={2}>
          
          <Grid item xs={12} sm={12} md={4}>
            <Card className={filmdetail.detail_card}>
              <img className={filmdetail.image} src={film.image} alt={film.title} />
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <article>
              <h2 className={filmdetail.detail_article_h2}>New Episodes</h2>
              <h1 className={filmdetail.detail_article_h1}>{film.title}</h1>
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
              <>
                {upcomingVideos.map((upcoming) => (
                  <React.Fragment key={upcoming._id}>
                    <p style={{ color: 'gray' }}>{upcoming.desc}</p>
                    {upcoming.video && (
                      <div>
                        <video className={filmdetail.video} controls>
                          <source src={upcoming.video} type="video/mp4" />
                          Sorry, your browser doesn't support embedded videos.
                        </video>
                      </div>
                    )}
                  </React.Fragment>
                ))}

                <h2 className={filmdetail.detail_article_h2}>Songs</h2>
                {upcomingSongs.map((song) => (
                  <div key={song._id}>
                    <p style={{ color: 'gray' }}>{song.desc}</p>
                    {song.song && (
                      <div>
                        <audio className={filmdetail.audio} controls>
                          <source src={song.song} type="audio/mp3" />
                          Sorry, your browser doesn't support embedded audio.
                        </audio>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p style={{ color: 'red', fontSize: '30px' }}>The movie has not been released yet :(</p>
            )}
          </Grid>
        </Grid>

        <div>

        </div>
      </section>
    </>
  );
};

export default MainFilmDetail;

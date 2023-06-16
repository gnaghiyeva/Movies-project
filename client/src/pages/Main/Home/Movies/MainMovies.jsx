import React, { useEffect, useState } from 'react'
import { getAllFilms } from '../../../../api/requests'
import Grid from '@mui/material/Grid';
import { Card, Image } from 'semantic-ui-react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'

const MainMovies = () => {
  const [films, setFilms] = useState([])
  const [categories, setCategories] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    getAllFilms().then((res) => {
      const formattedFilms = res.data;

      const sortedFilms = formattedFilms.sort((a, b) => b.imdb - a.imdb); // Sort films by IMDb rating

      setAllFilms(sortedFilms);
      setFilms(sortedFilms.slice(0, 8)); // Only display the first 8 films

      const uniqueCategories = [...new Set(sortedFilms.map((film) => film.category))];
      setCategories(uniqueCategories);
    });
  }, []);

  const handleCategoryFilter = (category) => {
    setActiveButton(category);

    if (category === 'All Movies') {
      setFilms(allFilms);
    } else {
      const filtered = allFilms.filter((film) => {
        return film.category && film.category.includes(category);
      });
      setFilms(filtered);
    }
  };
  return (
    <section style={{ backgroundColor: '#222', paddingTop: '60px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>


        <article style={{ textAlign: 'center' }}>
          <span style={{ color: 'yellow' }}>ONLINE STREAMING</span>
          <h1 style={{ color: 'white', fontSize: '36px' }}>Top Rated Movies</h1>
        </article>

        {/* <div>


     <Button onClick={() => handleCategoryFilter('Action')}>Action</Button>
      <Button onClick={() => handleCategoryFilter('Comedy')}>Comedy</Button>
      <Button onClick={() => handleCategoryFilter('Horror')}>Horror</Button>

    </div> */}


        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className={activeButton === 'All Movies' ? 'active' : ''}
            onClick={() => handleCategoryFilter('All Movies')}
            style={{ border: activeButton === 'All Movies' ? '1px solid yellow' : '' }}
          >
            All Movies
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              className={activeButton === category ? 'active' : ''}
              onClick={() => handleCategoryFilter(category)}
              style={{ border: activeButton === category ? '1px solid yellow' : '' }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>


      <Grid container spacing={4} style={{margin:'0 auto'}}>
        {films && films.map((film) => {
          return (



            <Grid item xs={6} md={3} key={film._id}>
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} layout>
                <AnimatePresence>
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
                </AnimatePresence>
              </motion.div>
            </Grid>

          )
        })}

      </Grid>

    </section>
  )
}

export default MainMovies
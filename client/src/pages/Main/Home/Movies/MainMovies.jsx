import React, { useEffect, useState } from 'react'
import { getAllFilms } from '../../../../api/requests'
import Grid from '@mui/material/Grid';
import { Card, Image } from 'semantic-ui-react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom';
import movieStyle from '../../../../assets/styles/mainMovies.module.css'

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
    <section className={movieStyle.movies_container}>
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


        <div className={movieStyle.movies_categories}>
          <Button
            className={activeButton === 'All Movies' ? 'active' : ''}
            onClick={() => handleCategoryFilter('All Movies')}
            style={{
              
              backgroundColor: 'rgb(11,17,16)',
              padding: '10px 30px',
              color: 'white',
              borderLeft: activeButton === 'All Movies' ? '1px solid yellow' : '',
              borderRight: activeButton === 'All Movies' ? '1px solid yellow' : '',
              color: activeButton === 'All Movies' ? 'yellow' : 'white',
            }}
          >
            All Movies
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              className={activeButton === category ? 'active' : ''}
              onClick={() => handleCategoryFilter(category)}
              style={{  backgroundColor: 'rgb(11,17,16)',
              padding: '10px 30px',
              color: 'white',
              borderLeft: activeButton === category ? '1px solid yellow' : '',
              borderRight: activeButton === category ? '1px solid yellow' : '',
              color: activeButton === category ? 'yellow' : 'white', }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>


      <Grid container spacing={2} style={{padding:'60px 90px'}}>
        {films && films.map((film) => {
          return (
            <Grid className={movieStyle.card} item sm={6} xs={12} md={4} lg={3} key={film._id}>
              <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} layout>
                <AnimatePresence>
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
                        <Card.Header><Link  className={movieStyle.film_title} to={`/film/${film._id}`}>{film.title}</Link></Card.Header>
                        <Card.Meta>
                          <span className='date' style={{ color: 'yellow' }}>{film.releaseDate.substring(0, 4)}</span>
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
                            <span style={{ display: 'flex', alignItems: 'center',gap:'5px'  }}>
                              <AccessTimeIcon style={{color:'yellow',fontSize:'16px'}} />  {film.minute} min
                            </span>
                          </Card.Description>
                          <Card.Description>
                            <span style={{ display: 'flex', alignItems: 'center',gap:'5px'  }}>
                              <ThumbUpIcon style={{color:'yellow',fontSize:'16px'}} /> {film.imdb}
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
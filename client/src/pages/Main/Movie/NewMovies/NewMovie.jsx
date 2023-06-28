import React, { useEffect, useState } from 'react'
import { getAllFilms } from '../../../../api/requests';
import Grid from '@mui/material/Grid';
import { Card } from 'semantic-ui-react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom';
import { Menu, MenuItem,IconButton } from '@mui/material';
import filmStyle from '../../../../assets/styles/mainFilms.module.css'
import MenuIcon from '@mui/icons-material/Menu';

const NewMovie = () => {
    const [films, setFilms] = useState([])
    const [categories, setCategories] = useState([]);
    const [allFilms, setAllFilms] = useState([]);
    const [activeButton, setActiveButton] = useState('');
    const [openModal, setOpenModal] = useState(null)
  useEffect(() => {
    getAllFilms().then((res) => {
      const formattedFilms = res.data.filter((film) => {
        const releaseDate = new Date(film.releaseDate);
        const currentDate = new Date();
        return releaseDate > currentDate;
      });
      setFilms(formattedFilms);
      setAllFilms(formattedFilms); 

      const uniqueCategories = [...new Set(formattedFilms.map((film) => film.category))];
      setCategories(uniqueCategories);
    });
  }, []);

  // useEffect(() => {
  //     getAllFilms().then((res) => {
  //       const formattedFilms = res.data;
  
 
  //       const recentlyAddedFilms = formattedFilms
  //         .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
  //         .slice(0, 4);
  
  //       setAllFilms(formattedFilms);
  //       setFilms(recentlyAddedFilms);
  //     });
  //   }, []);

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

  
  const handleMenuOpen = (event) => {
    setOpenModal(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenModal(null);
  };
  return (
    <section className={filmStyle.main_films_container}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'0 50px' }}>


      <article >
        <span className={filmStyle.films_article_span}>ONLINE STREAMING</span>
        <h1 className={filmStyle.films_article_h1}>New Release Movies</h1>
      </article>
     

      <IconButton className={filmStyle.films_categories_button} edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen} style={{ marginRight: '20px' }}>
          <MenuIcon />
        </IconButton>
        <Menu openModal={openModal} open={Boolean(openModal)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => handleCategoryFilter('All Movies')}
            className={activeButton === 'All Movies' ? 'active' : ''}
            style={{ border: activeButton === 'All Movies' ? '1px solid yellow' : '' }}
          >
            All Movies
          </MenuItem>
          {categories.map((category) => (
            <MenuItem
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={activeButton === category ? 'active' : ''}
              style={{ border: activeButton === category ? '1px solid yellow' : '' }}
            >
              {category}
            </MenuItem>
          ))}
        </Menu>

      <div className={filmStyle.films_categories} >
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




    <Grid container spacing={2} style={{padding:'30px 100px'}}>
      {films && films.map((film) => {
        return (
          <Grid item sm={6} xs={12} md={3} lg={3} key={film._id}>
          <motion.div animate={{opacity:1}} initial={{opacity:0}} layout>
          <AnimatePresence>
            <Card style={{ backgroundColor: '#222', color: 'white' }}>
              <img src={film.image} height={300} alt='film_photo'  />
              <Card.Content>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Card.Header><Link to={`/film/${film._id}`}>{film.title}</Link></Card.Header>
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

export default NewMovie
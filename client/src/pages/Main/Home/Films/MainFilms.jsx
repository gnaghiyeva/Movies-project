import React, { useEffect, useState } from 'react'
import { getAllFilms } from '../../../../api/requests'
import Grid from '@mui/material/Grid';
import { Card, Image } from 'semantic-ui-react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button, Menu, MenuItem,IconButton } from '@mui/material';
import {motion, AnimatePresence} from 'framer-motion'
import {Link} from 'react-router-dom'
import filmStyle from '../../../../assets/styles/mainFilms.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import { grey } from '@mui/material/colors';


const MainFilms = () => {
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

      const sortingFilms = formattedFilms.slice(-4).reverse();

      setFilms(sortingFilms);
      setAllFilms(sortingFilms); 

      const uniqueCategories = [...new Set(sortingFilms.map((film) => film.category))];
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

  const handleMenuOpen = (event) => {
    setOpenModal(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenModal(null);
  };

  return (
    <section className={filmStyle.main_films_container}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:'0 50px' }}>


        <article className={filmStyle.films_article} >
          <span className={filmStyle.films_article_span}>ONLINE STREAMING</span>
          <h1 className={filmStyle.films_article_h1}>UPCOMING MOVIES</h1>
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
            style={{ border: activeButton === 'All Movies' ? '1px solid yellow' : '', backgroundColor:'rgb(32,33,43)', padding:'10px 30px', color:'white', borderRadius:'25px' }}
          >
            All Movies
          </Button>
          {categories.map((category) => (
            <Button 
              key={category}
              className={activeButton === category ? 'active' : ''}
              onClick={() => handleCategoryFilter(category)}
              style={{ border: activeButton === category ? '1px solid yellow' : '' , backgroundColor:'rgb(32,33,43)', padding:'10px 30px', color:'white', borderRadius:'25px'}}
            >
              {category}
            </Button>
          ))}
        </div>

        

      </div>

      <Grid container spacing={4} style={{padding:'0 60px'}}>
        {films && films.map((film) => {
          return (
            <Grid item sm={6} xs={12} md={3} lg={3} key={film._id}>
            <motion.div animate={{opacity:1}} initial={{opacity:0}} layout>
            <AnimatePresence>
              <Card style={{  backgroundColor: 'transparent', color: 'white', position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease',
                    boxShadow: 'none',
                  }} 
                    className={filmStyle.hover_card}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0px 0px 10px 5px rgba(0, 0, 0, 0.95)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                <img src={film.image} height={300}  />
                <Card.Content>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Header><Link  className={filmStyle.film_title} to={`/film/${film._id}`}>{film.title}</Link></Card.Header>
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
                        <span style={{ display: 'flex', alignItems: 'center', gap:'5px' }}>
                          <AccessTimeIcon style={{color:'yellow',fontSize:'16px'}} />  {film.minute} min
                        </span>
                      </Card.Description>
                      <Card.Description>
                        <span style={{ display: 'flex', alignItems: 'center',gap:'5px' }}>
                          <ThumbUpIcon style={{color:'yellow',fontSize:'16px'}} /> {film.imdb}
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

export default MainFilms
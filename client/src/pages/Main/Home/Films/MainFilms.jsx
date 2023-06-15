import React, { useEffect, useState } from 'react'
import { getAllFilms } from '../../../../api/requests'
import Grid from '@mui/material/Grid';
import { Card, Image } from 'semantic-ui-react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Button } from '@mui/material';

const MainFilms = () => {
  const [films, setFilms] = useState([])
  const [categories, setCategories] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [activeButton, setActiveButton] = useState('');

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


        <article>
          <span style={{ color: 'yellow' }}>ONLINE STREAMING</span>
          <h1 style={{ color: 'white', fontSize: '36px' }}>UPCOMING MOVIES</h1>
        </article>

        {/* <div>


       <Button onClick={() => handleCategoryFilter('Action')}>Action</Button>
        <Button onClick={() => handleCategoryFilter('Comedy')}>Comedy</Button>
        <Button onClick={() => handleCategoryFilter('Horror')}>Horror</Button>

      </div> */}


        <div>
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


      <Grid container spacing={2}>
        {films && films.map((film) => {
          return (



            <Grid item xs={6} md={3} key={film._id}>

              <Card style={{ backgroundColor: '#222', color: 'white' }}>
                <Image src={film.image} wrapped ui={false} />
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
            </Grid>

          )
        })}

      </Grid>

    </section>
  )
}

export default MainFilms
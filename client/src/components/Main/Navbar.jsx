import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MovieLogo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import navStyle from '../../assets/styles/navbar.module.css';
import { List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { getAllFilms } from '../../api/requests';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [films, setFilms] = useState([])
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 800; // İstenilen scroll yüksekliği

      if (window.scrollY > scrollThreshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = async (e) => {
    const searchFilm = e.target.value;
    if (searchFilm) {
      try {
        const res = await getAllFilms(searchFilm);
        setFilms(res.data);
      } catch (error) {
        console.log('Error searching films:', error);
      }
    } else {
      setFilms([]);
    }
  };


  function handleChange(e){
    getAllFilms(e.target.value).then((res)=>{
        setFilms(res.data)  
        console.log(res.data)
    })
  }

  return (
    <>
      <nav style={{ backgroundColor: '#222',padding:'20px 0' }} className={navStyle.nav}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div>
            <img width={200} src={MovieLogo} alt='movieLogo' />
          </div>

          <div className={`${navStyle.nav_list} ${showMenu ? 'show' : ''}`}>
            <List style={{ display: 'flex' }}>
              <ListItem onClick={() => handleNavigation('/')}>
                <span className={navStyle.list_item}>HOME</span>
              </ListItem>
              <ListItem onClick={() => handleNavigation('/movie')}>
                <span className={navStyle.list_item}>MOVIE</span>
              </ListItem>
              <ListItem onClick={() => handleNavigation('/pricings')}>
                <span className={navStyle.list_item}>PRICING</span>
              </ListItem>
              <ListItem onClick={() => handleNavigation('/blog')}>
                <span className={navStyle.list_item}>BLOG</span>
              </ListItem>
              <ListItem onClick={() => handleNavigation('/contact')}>
                <span className={navStyle.list_item}>CONTACT</span>
              </ListItem>
            </List>
          </div>

          <div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon style={{ color: 'white' }} />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e)=>handleChange(e)}
                style={{ color: 'white' }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
               {films.length > 0 && (
                <div style={{ backgroundColor: 'white', position: 'absolute', top: '100%', left: 0, width: '100%' }}>
                  <List style={{backgroundColor:'rgb(67,67,67)'}}>
                    {films.map((film) => (
                      <ListItem  key={film.id}>
                        <span style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
                          {film.title}
                        </span>
                      </ListItem>
                    ))}
                  </List>
                </div>
              )}
            </Search>
          </div>

          <div className={`${navStyle.hamburger_menu} ${showMenu ? 'open' : ''}`} onClick={toggleDrawer}>
            <div className={navStyle.hamburger_menu_line}></div>
            <div className={navStyle.hamburger_menu_line}></div>
            <div className={navStyle.hamburger_menu_line}></div>
          </div>
        </div>
      </nav>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
          style={{ width: '250px' }}
        >
          <List>
            <ListItem button onClick={() => handleNavigation('/')}>
              <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                <span>HOME</span>
              </Link>
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/movie')}>
              <Link to="/movie" style={{ color: 'black', textDecoration: 'none' }}>
                <span>MOVIE</span>
              </Link>
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/pricings')}>
              <Link to="/pricings" style={{ color: 'black', textDecoration: 'none' }}>
                <span>PRICING</span>
              </Link>
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/blog')}>
              <Link to="/blog" style={{ color: 'black', textDecoration: 'none' }}>
                <span>BLOG</span>
              </Link>
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/contact')}>
              <Link to="/contact" style={{ color: 'black', textDecoration: 'none' }}>
                <span>CONTACT</span>
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;

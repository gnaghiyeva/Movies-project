import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from '@mui/material';
import { useUserContext } from '../../context/UserContext';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import TheatersIcon from '@mui/icons-material/Theaters';
import ContrastIcon from '@mui/icons-material/Contrast';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const Navbarr = () => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' ? '' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Sliders', 'pricingSliders', 'Films', 'Contact', 'Services', 'Streamings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>

               
                {text === 'Sliders' ? <Link to='sliders'><ContrastIcon /></Link> : ''}
                {text === 'pricingSliders' ? <Link to='pricingSliders'><AttachMoneyIcon/></Link> : ''}
                {text === 'Films' ? <Link to='films'><TheatersIcon /></Link> : ''}
                {text === 'Contact' ? <Link to='contact'><ContactPageIcon /></Link> : ''}
                {text === 'Services' ? <Link to='services'><DesignServicesIcon /></Link> : ''}
                {text === 'Streamings' ? <Link to='streamings'><ConnectedTvIcon /></Link> : ''}

              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      
    </Box>
  )
  const [user, setUser] = useUserContext()
  console.log(user)
  const navigate = useNavigate();
  return (
    <Navbar style={{ backgroundColor: 'rgb(248,154,174)' }}>
      <div>
        {['|||'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>

      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user === null ? <>
            <Link to="/admin/login">Login Admin</Link>
          </> : <>
            <Navbar.Text>
              Signed in as: <p>{user.username}</p>
            </Navbar.Text>
            {user && <>
              <Button onClick={async () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                await setUser(null);
                // await setUser("");

                navigate('/admin/login')
                // navigate("http://localhost:3000/admin")
              }} color="inherit">
                Logout
              </Button>
            </>}
          </>}

        </Navbar.Collapse>

        {/* <Nav.Link href="#link"><Link>Add Slider</Link></Nav.Link> */}
      </Container>
    </Navbar>

  )
}

export default Navbarr
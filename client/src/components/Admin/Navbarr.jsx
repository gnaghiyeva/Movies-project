import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from '@mui/material';
import { useUserContext } from '../../context/UserContext';

const Navbarr = () => {
  const [user,setUser] = useUserContext()
  console.log(user)
  const navigate = useNavigate();
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
         {user===null ? <>
         <Link to="/admin/login">Login Admin</Link>
         </> : <>
         <Navbar.Text>
            Signed in as: <a>{user.username}</a>
          </Navbar.Text>
          {user &&  <>
            <Button onClick={async()=>{
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
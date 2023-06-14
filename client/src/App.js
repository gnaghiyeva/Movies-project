import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { ROUTES } from './routes/routes';
import { UserContextProvider } from './context/UserContext';
import { SliderContextProvider } from './context/SliderContext';
import { FilmContextProvider } from './context/FilmContext';
import { ServiceContextProvider } from './context/ServiceContext';
function App() {
  const routes = createBrowserRouter(ROUTES)
  return (
   <>
  
   <UserContextProvider>
   <SliderContextProvider>
    <FilmContextProvider>
      <ServiceContextProvider>
    <RouterProvider router={routes}>

    </RouterProvider>
    </ServiceContextProvider>
    </FilmContextProvider>
    </SliderContextProvider>
   </UserContextProvider>
   
   </>
  );
}

export default App;

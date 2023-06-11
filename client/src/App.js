import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ROUTES } from './routes/routes';
import { UserContextProvider } from './context/UserContext';
import { SliderContextProvider } from './context/SliderContext';
function App() {
  const routes = createBrowserRouter(ROUTES)
  return (
   <>
  
   <UserContextProvider>
   <SliderContextProvider>
    <RouterProvider router={routes}>

    </RouterProvider>
    </SliderContextProvider>
   </UserContextProvider>
   
   </>
  );
}

export default App;

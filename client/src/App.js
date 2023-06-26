import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { ROUTES } from './routes/routes';
import { UserContextProvider } from './context/UserContext';
import { SliderContextProvider } from './context/SliderContext';
import { FilmContextProvider } from './context/FilmContext';
import { ServiceContextProvider } from './context/ServiceContext';
import { StreamingContextProvider } from './context/StreamingContext';
import { PricingContextProvider } from './context/PricingContext';
import { PricingStrategyProvider } from './context/PricingStrategy';
import { DetailContextProvider } from './context/DetailContext';
import { ContactProvider } from './context/ContactContext';
import { BlogContextProviver } from './context/BlogContext';
function App() {
  const routes = createBrowserRouter(ROUTES)
  return (
    <>

      <UserContextProvider>
        <SliderContextProvider>
          <FilmContextProvider>
            <ServiceContextProvider>
              <StreamingContextProvider>
                <PricingContextProvider>
                  <PricingStrategyProvider>
                    <DetailContextProvider>
                      <ContactProvider>
                        <BlogContextProviver>
                          <RouterProvider router={routes}>

                          </RouterProvider>
                        </BlogContextProviver>
                      </ContactProvider>
                    </DetailContextProvider>
                  </PricingStrategyProvider>
                </PricingContextProvider>
              </StreamingContextProvider>
            </ServiceContextProvider>
          </FilmContextProvider>
        </SliderContextProvider>
      </UserContextProvider>

    </>
  );
}

export default App;

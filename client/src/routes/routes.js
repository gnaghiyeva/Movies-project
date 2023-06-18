import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AddFilm from "../pages/Admin/Films/AddFilm";
import AdminFilms from "../pages/Admin/Films/AdminFilms";
import EditFilm from "../pages/Admin/Films/EditFilm";
import AddPricing from "../pages/Admin/Pricings/AddPricing";
import AddPricingStrategy from "../pages/Admin/Pricings/AddPricingStrategy";
import AdminPricingStrategy from "../pages/Admin/Pricings/AdminPricingStrategy";
import AdminPricings from "../pages/Admin/Pricings/AdminPricings";
import EditPricing from "../pages/Admin/Pricings/EditPricing";
import EditPricingStrategy from "../pages/Admin/Pricings/EditPricingStrategy";
import AddService from "../pages/Admin/Services/AddService";
import AdminServices from "../pages/Admin/Services/AdminServices";
import EditService from "../pages/Admin/Services/EditService";
import AddSlider from "../pages/Admin/Slider/AddSlider";
import AdminSliders from "../pages/Admin/Slider/AdminSliders";
import EditSlider from "../pages/Admin/Slider/EditSlider";
import AdminStreamings from "../pages/Admin/Streaming/AdminStreamings";
import EditStreaming from "../pages/Admin/Streaming/EditStreaming";
import Home from "../pages/Main/Home/Home";
import MainRoot from "../pages/Main/MainRoot";
import Movie from "../pages/Main/Movie/Movie";
import Pricings from "../pages/Main/Pricing/Pricings";



export const ROUTES = [
    {
        path:'/',
        element:<MainRoot/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'movie',
                element:<Movie/>
            },
            {
                path:'pricings',
                element:<Pricings/>
            }
            
            

        ]
    },
    {
        path:'/admin',
        element:<AdminRoot/>,
        children:[
            {
                path:'',
                element:<Dashboard/>
            },
            {
                path:'login',
                element:<AdminLogin/>
            },
            {
                path:'sliders',
                element:<AdminSliders/>
            },
            {
                path:'add-slider',
                element:<AddSlider/>
            },
            {
                path:'slider/edit/:id',
                element:<EditSlider/>
            },
            {
                path:'films',
                element:<AdminFilms/>
            },
            {
                path:'add-film',
                element:<AddFilm/>
            },
            {
                path:'film/edit/:id',
                element:<EditFilm/>
            },
            {
                path:'services',
                element:<AdminServices/>
            },
            {
                path:'add-service',
                element:<AddService/>
            },
            {
                path:'service/edit/:id',
                element:<EditService/>
            },
            {
                path:'streamings',
                element:<AdminStreamings/>
            },
            {
                path:'streaming/edit/:id',
                element:<EditStreaming/>
            },
            
            {
                path:'pricingSliders',
                element:<AdminPricings/>
            },
            {
                path:'add-pricingSlider',
                element:<AddPricing/>
            },
            {
                path:'pricingSlider/edit/:id',
                element:<EditPricing/>
            },
            {
                path:'pricingStrategy',
                element:<AdminPricingStrategy/>
            },
            {
                path:'add-pricingStrategy',
                element:<AddPricingStrategy/>
            },
            {
                path:'pricingStrategy/edit/:id',
                element:<EditPricingStrategy/>
            },




        ]
    }
]
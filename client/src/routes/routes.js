import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AddFilm from "../pages/Admin/Films/AddFilm";
import AdminFilms from "../pages/Admin/Films/AdminFilms";
import EditFilm from "../pages/Admin/Films/EditFilm";
import AddSlider from "../pages/Admin/Slider/AddSlider";
import AdminSliders from "../pages/Admin/Slider/AdminSliders";
import EditSlider from "../pages/Admin/Slider/EditSlider";
import Home from "../pages/Main/Home/Home";
import MainRoot from "../pages/Main/MainRoot";

export const ROUTES = [
    {
        path:'/',
        element:<MainRoot/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            

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

        ]
    }
]
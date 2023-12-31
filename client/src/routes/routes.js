import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import AddBlog from "../pages/Admin/Blog/AddBlog";
import AdminBlog from "../pages/Admin/Blog/AdminBlog";
import EditBlog from "../pages/Admin/Blog/EditBlog";
import AdminContact from "../pages/Admin/Contact/AdminContact";
import EditContact from "../pages/Admin/Contact/EditContact";
import ContactUsers from "../pages/Admin/ContactUsers/ContactUsers";
import EditContactUser from "../pages/Admin/ContactUsers/EditContactUser";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AddDetailSong from "../pages/Admin/Detail/AddDetailSong";
import AddDetailVideo from "../pages/Admin/Detail/AddDetailVideo";
import AdminDetail from "../pages/Admin/Detail/AdminDetail";
import EditDetail from "../pages/Admin/Detail/EditDetail";
import EditSong from "../pages/Admin/Detail/EditSong";
import AddFilm from "../pages/Admin/Films/AddFilm";
import AdminFilms from "../pages/Admin/Films/AdminFilms";
import EditFilm from "../pages/Admin/Films/EditFilm";
import NotFound from "../pages/Admin/NotFound/NotFound";
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
import Blog from "../pages/Main/Blog/Blog";
import BlogDetail from "../pages/Main/Blog/MainBlogs/BlogDetail";
import Contact from "../pages/Main/Contact/Contact";
import MainFilmDetail from "../pages/Main/Home/Films/MainFilmDetail";
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
            },
            {
                path:'film/:id',
                element:<MainFilmDetail/>
            },
            {
                path:'contact',
                element:<Contact/>
            },
            {
                path:'blog',
                element:<Blog/>
            },
            {
                path:'blog/:id',
                element:<BlogDetail/>
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
                path:'add-video',
                element:<AddDetailVideo/>
            },
            {
                path:'film/edit/:id',
                element:<EditFilm/>
            },
            {
                path:'film/:id',
                element:<AdminDetail/>
            },
            {
                path:'videoDetail/edit/:id',
                element:<EditDetail/>
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
            {
                path:'contact',
                element:<AdminContact/>
            },
            {
                path:'contact/edit/:id',
                element:<EditContact/>
            },
            {
                path:'blogs',
                element:<AdminBlog/>
            },
            {
                path:'blog/edit/:id',
                element:<EditBlog/>
            },
            {
                path:'add-blog',
                element:<AddBlog/>
            },
            {
                path:'contactUsers',
                element:<ContactUsers/>
            },
            {
                path:'contactUser/edit/:id',
                element:<EditContactUser/>
            },
            {
                path:'*',
                element:<NotFound/>
            },
            {
                path:'add-song',
                element:<AddDetailSong/>
            },
            {
                path:'songDetail/edit/:id',
                element:<EditSong/>
            },



        ]
    }
]
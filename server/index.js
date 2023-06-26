const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const user_router = require('./routes/users.routes');
const slider_router = require('./routes/slider.routes');
const category_router = require('./routes/category.routes');
const film_router = require('./routes/film.routes');
const service_router = require('./routes/service.routes');
const streaming_router = require('./routes/streaming.routes');
const pricing_router = require('./routes/pricing.routes');
const pricingSlider_router = require('./routes/pricingSlider.routes');
const upcomingVideo_router = require('./routes/upcomingVideo.routes');
const contact_router = require('./routes/contact.routes');
const blog_router = require('./routes/blog.routes');

dotenv.config();
app.use(bodyParser.json());
app.use(cors());




DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(() => {
    console.log('MongoDB Connected')
})

//routers


app.get('/api', (req, res) => {
    res.send('Hello World!')
})


app.use('/api', user_router)
app.use('/api/sliders', slider_router)
app.use('/images', express.static('images'))
app.use('/videos', express.static('videos'))

app.use('/api/categories', category_router)

app.use('/api/films', film_router)

app.use('/api/services', service_router)

app.use('/api/streamings', streaming_router)

app.use('/api/pricings', pricing_router)

app.use('/api/pricingSliders', pricingSlider_router)

app.use('/api/upcomingvideos', upcomingVideo_router)

app.use('/api/contact', contact_router)

app.use('/api/blogs', blog_router)

PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
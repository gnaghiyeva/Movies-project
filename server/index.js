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


app.use('/api/categories', category_router)

app.use('/api/films', film_router)

app.use('/api/services', service_router)

PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
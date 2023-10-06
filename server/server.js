//Import Modules

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require ("cors");
const artworkRoutes = require('./routes/artwork');
const userRoutes = require('./routes/user');

require('dotenv').config();

//App
const app = express();
app.use(express.json())

//DB
mongoose
    .connect(process.env.MONGO_URI, {
        
    })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log('DB Connection ERROR', err));


//Middleware
app.use(morgan('dev'));
app.use(cors({origin: true , credentials: true}));

//Routes
app.use('/api/artworks', artworkRoutes)
app.use('/api/user', userRoutes);

//Port
const port = process.env.PORT || 8080;

//Listener
const server = app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
);
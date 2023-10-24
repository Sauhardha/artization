//Import Modules

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require ("cors");
const artworkRoutes = require('./routes/artwork');
const userRoutes = require('./routes/user');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

//App
const app = express();
app.use(express.json({limit: '50mb'}))

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
app.use('/images/:Id',(req, res)=>{
    const {Id} = req.params;
    const imageDirectory = path.join(__dirname, 'images');
    const files = fs.readdirSync(imageDirectory);

    const matchingImage = files.find(file => file.startsWith(Id));

    const readStream = fs.createReadStream(`images/${matchingImage}`)
    readStream.pipe(res)
})

//Port
const port = process.env.PORT || 8080;

//Listener
const server = app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
);
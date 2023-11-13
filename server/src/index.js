//Import Modules

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require ("cors");
const artWorkRoutes = require('./routes/artwork')
const auth = require('./routes/Auth');
const userRoute = require('./routes/Users')
const galleryRoute = require('./routes/Gallery')
const path = require('path');
const fs = require('fs');

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
app.use('/api/artworks', artWorkRoutes);
app.use('/api/gallery', galleryRoute)
app.use('/api/auth', auth);
app.use('/api/user', userRoute);
app.use('/images/:Id', (req, res) => {
    const { Id } = req.params;
    const imageDirectory = path.join(__dirname, '.', 'images'); 
    const files = fs.readdirSync(imageDirectory);

    const matchingImage = files.find(file => file.startsWith(Id));

    if (!matchingImage) {
        return res.status(404).send('Image not found');
    }

    const imagePath = path.join(__dirname, '.', 'images', matchingImage); 
    const readStream = fs.createReadStream(imagePath);
    readStream.pipe(res);
});

//Port
const port = process.env.PORT || 8080;

//Listener
const server = app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
);
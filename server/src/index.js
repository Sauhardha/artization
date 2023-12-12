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

const _dirname = path.dirname("")
const buildPath = path.join(_dirname , "../client/build");

//App
const app = express();
app.use(express.json())

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(_dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
})

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
const port = process.env.PORT || 9090;

//Listener
const server = app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
);
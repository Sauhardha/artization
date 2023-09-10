//Import Modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require ("cors");

require('dotenv').config();




//App
const app = express();

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
const testRoutes = require("./routes/test");
app.use("/", testRoutes);

//Port
const port = process.env.PORT || 8080;

//Listener
const server = app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
);
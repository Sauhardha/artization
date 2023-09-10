const express = require("express");
const router = express.Router();

//Import Controllers
const {getTest} = require(`../controllers/test`);

//Import middlewares

//API Routes
router.get("/test", getTest);

module.exports = router;
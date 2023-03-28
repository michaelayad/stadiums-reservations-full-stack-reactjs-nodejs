const express = require("express");
const { addStadium ,getStadium,getAllStadiums,getBestStadiums} = require('../controllers/stadium.controller');
const {verifyOwner}=require('../middlewares/auth')
require('dotenv').config();

const stadiumRouter = express.Router();



stadiumRouter.post("/",verifyOwner, addStadium);
stadiumRouter.get("/", getAllStadiums);
stadiumRouter.get("/best-stadiums", getBestStadiums);
stadiumRouter.get("/:id", getStadium);


module.exports = stadiumRouter
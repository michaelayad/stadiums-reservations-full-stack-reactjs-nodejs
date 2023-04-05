const express = require("express");
const { addStadium, getStadium, getAllStadiums, getBestStadiums, getStadiumsByOwnerID, addAvailableHours } = require('../controllers/stadium.controller');
const { verifyOwner } = require('../middlewares/auth')
require('dotenv').config();

const stadiumRouter = express.Router();



stadiumRouter.post("/", verifyOwner, addStadium);
stadiumRouter.get("/", getAllStadiums);
stadiumRouter.get("/best-stadiums", getBestStadiums);
stadiumRouter.get("/by-owner", verifyOwner, getStadiumsByOwnerID);
stadiumRouter.get("/:id", getStadium);
stadiumRouter.post("/:id/add-hours", verifyOwner, addAvailableHours);



module.exports = stadiumRouter
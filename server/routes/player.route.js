const express = require("express");
const { signup, login, getPlayer } = require('../controllers/player.controller');
const { ownerModel } = require('../models/index');
const { verifyPlayer } = require('../middlewares/auth')
require('dotenv').config();

const playerRouter = express.Router();



// Handling clint requests
//register new User

playerRouter.post("/", signup);
playerRouter.post("/login", login);
playerRouter.get("/", verifyPlayer, getPlayer);

module.exports = playerRouter
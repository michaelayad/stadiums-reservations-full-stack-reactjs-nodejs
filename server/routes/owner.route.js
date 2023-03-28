const express = require("express");
const { signup , login , getOwner } = require('../controllers/owner.controller');
const { ownerModel } = require('../models/index');
const {verifyOwner}=require('../middlewares/auth')
require('dotenv').config();

const ownerRouter = express.Router();



// Handling clint requests
//register new User

ownerRouter.post("/", signup);
ownerRouter.post("/login", login);
ownerRouter.get("/",verifyOwner,getOwner);

module.exports = ownerRouter
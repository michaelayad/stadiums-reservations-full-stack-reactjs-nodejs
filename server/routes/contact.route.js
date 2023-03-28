
const express = require("express");
const addContactController = require('../controllers/contact.controller');
require('dotenv').config();

const contactRouter = express.Router();



// Handling clint requests
//register new User

contactRouter.post("/", addContactController);


module.exports = contactRouter
const express = require("express");
const { addReservation, getReservationByOwnerID, verifyReservation ,cancelReservation} = require('../controllers/reservation.controller');
const { verifyOwner, verifyPlayer } = require('../middlewares/auth')
require('dotenv').config();

const reservationRouter = express.Router();



reservationRouter.post("/", verifyPlayer, addReservation);
reservationRouter.get("/by-owner", verifyOwner, getReservationByOwnerID);
reservationRouter.post("/:id/verify", verifyOwner, verifyReservation);
reservationRouter.delete("/:id/cancel", verifyOwner, cancelReservation);





module.exports = reservationRouter
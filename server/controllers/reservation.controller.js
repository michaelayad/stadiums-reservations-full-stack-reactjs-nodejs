const reservationService = require('../services/reservation.service')


const addReservation = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode, reservation } = await reservationService.addReservation(
        req.body, req.playerId
    );

    //  Check if something went wrong
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    //  If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        reservation
    });
};

const getReservationByOwnerID = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode, reservations } = await reservationService.getReservationByOwnerID(
        req.ownerId
    );

    //  Check if something went wrong
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    //  If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
        reservations
    });
};
const verifyReservation = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode } = await reservationService.verifyReservation(
        req.params.id);

    //  Check if something went wrong
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    //  If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
    });
};
const cancelReservation = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode } = await reservationService.cancelReservation(
        req.params.id);

    //  Check if something went wrong
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message,
        });
    }

    //  If everything is OK, send data
    return res.status(statusCode).json({
        type,
        message,
    });
};
module.exports = { addReservation, getReservationByOwnerID, verifyReservation,cancelReservation };  
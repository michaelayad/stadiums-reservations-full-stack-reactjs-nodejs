const { stadiumModel, availableHourModel, reservationModel, playerModel, ownerModel } = require('../models/index')
const { Op } = require('sequelize');
const addReservation = async (body, playerId) => {
    body.playerId = playerId;
    body.isValid = false
    console.log(body);
    try {
        await availableHourModel.update({ isAvailable: false }, { where: { stadiumId: body.stadiumId, day: body.day, hour: body.hour } })
        const reservation = await reservationModel.create(body)
        console.log(reservation)
        return {
            type: "Success",
            message: "successful add reservation",
            statusCode: 200,
            reservation: reservation

        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed add reservation",
            statusCode: 401,
        };


    }
}
const getReservationByOwnerID = async (ownerId) => {
    try {
        let stadiums = await stadiumModel.findAll({ attributes: ['id'], where: { ownerID: ownerId } })
        // await availableHourModel.update({ isAvailable: false }, { where: { stadiumId: body.stadiumId, day: body.day, hour: body.hour } })
        let arrOfStadiumsId = stadiums.map(s => s.id)
        const reservations = await reservationModel.findAll({
            where: {
                stadiumId: {
                    [Op.in]: arrOfStadiumsId
                },
            },
            include: [{
                model: playerModel,
                attributes: ['name', 'tel']
            }, {
                model: stadiumModel,
                attributes: ['title', 'address', 'hourPrice'],
                include: [
                    {
                        model: ownerModel,
                        attributes: ['name', 'tel']
                    }
                ]
            }
            ], order: [['createdAt', 'DESC']]
        })
        // console.log(reservations)
        return {
            type: "Success",
            message: "successful get reservation",
            statusCode: 200,
            reservations: reservations,
        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed get reservation",
            statusCode: 401,
        };


    }
}
const verifyReservation = async (reservationId) => {
    try {

        await reservationModel.update({ isValid: true }, { where: { id: reservationId } });

        return {
            type: "Success",
            message: "successful verify reservation",
            statusCode: 200,
        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed verify reservation",
            statusCode: 401,
        };


    }
}

const cancelReservation = async (reservationId) => {
    try {
        const reservation = await reservationModel.findOne({ where: { id: reservationId } });
        await availableHourModel.update({ isAvailable: true }, { where: { stadiumId: reservation.stadiumId, day: reservation.day, hour: reservation.hour } })
        await reservationModel.destroy({ where: { id: reservationId } });

        return {
            type: "Success",
            message: "successful cancel reservation",
            statusCode: 200,
        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed cancel reservation",
            statusCode: 401,
        };


    }
}
const getReservationByPlayerID = async (playerId) => {
    try {
        const reservations = await reservationModel.findAll({
            where: {
                playerId: playerId
            },
            include: [{
                model: playerModel,
                attributes: ['name', 'tel']
            }, {
                model: stadiumModel,
                attributes: ['title', 'address', 'hourPrice'],
                include: [
                    {
                        model: ownerModel,
                        attributes: ['name', 'tel']
                    }
                ]
            }
            ], order: [['createdAt', 'DESC']]
        })
        // console.log(reservations)
        return {
            type: "Success",
            message: "successful get reservation",
            statusCode: 200,
            reservations: reservations,
        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed get reservation",
            statusCode: 401,
        };


    }
}
module.exports = { addReservation, getReservationByOwnerID, verifyReservation, cancelReservation, getReservationByPlayerID };


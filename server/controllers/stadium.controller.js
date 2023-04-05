const stadiumService = require('../services/stadium.service')


const addStadium = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode, stadium } = await stadiumService.addStadium(
        req.body, req.ownerId
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
        stadium
    });
};
const getStadium = async (req, res, next) => {

    //  Calling sign up service
    const { type, message, statusCode, stadium } = await stadiumService.getStadium(
        req.params.id
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
        stadium
    });
};
const getAllStadiums = async (req, res, next) => {

    //  Calling sign up service
    const { type, message, statusCode, stadiums } = await stadiumService.getAllStadiums();

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
        stadiums
    });
};

const getBestStadiums = async (req, res, next) => {

    //  Calling sign up service
    const { type, message, statusCode, stadiums } = await stadiumService.getBestStadiums();

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
        stadiums
    });
};
const getStadiumsByOwnerID = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode, stadiums } = await stadiumService.getStadiumsByOwnerID(
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
        stadiums
    });
};
const addAvailableHours = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode } = await stadiumService.addAvailableHours(
        req.body,
        req.params.id,
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
        message
    });
};
module.exports = { addStadium, getStadium, getAllStadiums, getBestStadiums, getStadiumsByOwnerID, addAvailableHours };  
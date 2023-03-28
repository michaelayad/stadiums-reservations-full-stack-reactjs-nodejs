const playerService = require('../services/player.service')


const signup = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode, player, token } = await playerService.signup(
        req.body
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
        player,
        token,
    });
};

const login = async (req, res, next) => {
    const { type, message, statusCode, player, token } = await playerService.login(
        req.body
    );
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message,
        });
    }
    return res.status(statusCode).json({
        type,
        message,
        player,
        token,
    });
};



const getPlayer = async (req, res, next) => {
    const { type, message, statusCode, player } = await playerService.getPlayerDetails(
        req.playerId
    );
    console.log(type, message, statusCode, player);
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message,
        });
    }
    return res.status(statusCode).json({
        type,
        message,
        player,
    });
};
module.exports = { signup, login, getPlayer };  
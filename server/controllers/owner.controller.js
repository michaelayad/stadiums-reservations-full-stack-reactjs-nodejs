const ownerService = require('../services/owner.service')


const signup = async (req, res, next) => {
    //  Calling sign up service
    const { type, message, statusCode, owner, token } = await ownerService.signup(
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
        owner,
        token,
    });
};

const login = async (req, res, next) => {
    const { type, message, statusCode, owner, token } = await ownerService.login(
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
        owner,
        token,
    });
};



const getOwner = async (req, res, next) => {
    const { type, message, statusCode, owner } = await ownerService.getOwnerDetails(
        req.ownerId
    );
    console.log(type, message, statusCode, owner);
    if (type === "Error") {
        return res.status(statusCode).json({
            type,
            message,
        });
    }
    return res.status(statusCode).json({
        type,
        message,
        owner,
    });
};
module.exports = { signup, login, getOwner };  
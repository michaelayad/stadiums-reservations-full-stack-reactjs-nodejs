const addContact = require('../services/contact.service')


const addContactController = async (req, res, next) => {
    //  Calling sign up service
    const { type, statusCode, message } = await addContact(
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

    });
};


module.exports = addContactController;  
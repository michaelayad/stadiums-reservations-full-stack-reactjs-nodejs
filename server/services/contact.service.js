const { contactModel } = require('../models/index')

const addContact = async (body) => {

    try {
        const contact = await contactModel.create(body)
        console.log(contact)
        return {
            type: "Success",
            message: "successful send contact",
            statusCode: 200,


        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed send contact",
            statusCode: 401,
        };


    }
}
module.exports = addContact;


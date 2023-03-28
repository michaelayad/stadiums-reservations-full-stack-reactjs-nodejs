const { stadiumModel, availableHourModel } = require('../models/index')

const addStadium = async (body, ownerId) => {
    body.ownerID = ownerId;
    try {
        const stadium = await stadiumModel.create(body)
        console.log(stadium)
        return {
            type: "Success",
            message: "successful add stadium",
            statusCode: 200,
            stadium: stadium

        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed add stadium",
            statusCode: 401,
        };


    }
}
const getStadium = async (id) => {
    try {
        let stadium = await stadiumModel.findByPk(id)
        // console.log(stadium);
        const availableHours = await availableHourModel.findAll({ where: { stadiumId: id , isAvailable:true } })
        console.log("ssssssssssssss");
        
        stadium = { ...stadium.dataValues, availableHours };
        return {
            type: "Success",
            message: "successful get stadium",
            statusCode: 200,
            stadium: stadium

        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed get stadium",
            statusCode: 401,
        };


    }
}

const getAllStadiums= async () => {
    try {
        let stadiums = await stadiumModel.findAll();
        // console.log(stadiums);
        return {
            type: "Success",
            message: "successful get stadiums",
            statusCode: 200,
            stadiums: stadiums

        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed get stadiums",
            statusCode: 401,
        };


    }
}
const getBestStadiums= async () => {
    try {
        let stadiums = await stadiumModel.findAll({ limit: 5 });
        // console.log(stadiums);
        return {
            type: "Success",
            message: "successful get stadiums",
            statusCode: 200,
            stadiums: stadiums

        };
    }
    catch (err) {
        return {
            type: "Error",
            message: "failed get stadiums",
            statusCode: 401,
        };


    }
}
module.exports = { addStadium, getStadium ,getAllStadiums,getBestStadiums };


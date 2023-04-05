const { stadiumModel, availableHourModel } = require('../models/index')
const { Op } = require('sequelize');
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
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const d = `${year}-${month}-${day}`;
    console.log(d);
    try {
        let stadium = await stadiumModel.findByPk(id)

        // console.log(stadium);
        let availableHours = await availableHourModel.findAll({ where: { stadiumId: id, isAvailable: true, day: { [Op.gte]: d } } })
        console.log("ssssssssssssss");
        // let resAvailableHours = []
        // availableHours.forEach(hour => {
        //     if (hour.day >= d) {
        //         resAvailableHours.push(hour);
        //     }
        // });
        stadium = { ...stadium.dataValues, availableHours: availableHours };
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

const getAllStadiums = async () => {
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
const getBestStadiums = async () => {
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

const getStadiumsByOwnerID = async (ownerId) => {
    try {
        let stadiums = await stadiumModel.findAll({ where: { ownerID: ownerId } })
        // console.log(stadium);

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

const addAvailableHours = async (hours, stadiumId, ownerId) => {
    let availableHours = hours.map((hour) => {
        hour.isAvailable = true;
        hour.stadiumId = stadiumId;
        hour.day = new Date(hour.day);
        return hour;
    })
    console.log(availableHours);
    try {
        let stadium = await stadiumModel.findByPk(stadiumId);
        if (stadium.ownerID !== ownerId) {
            return {
                type: "Error",
                message: "failed authorization owner",
                statusCode: 401,
            };
        }
        await availableHourModel.bulkCreate(availableHours, { ignoreDuplicates: true })

        // console.log(stadium);

        return {
            type: "Success",
            message: "successful add available hours",
            statusCode: 200,
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

module.exports = { addStadium, getStadium, getAllStadiums, getBestStadiums, getStadiumsByOwnerID, addAvailableHours };


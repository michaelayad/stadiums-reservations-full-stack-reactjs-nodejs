const {
    ownerModel,
    playerModel,
    stadiumModel,
    availableHourModel,
} = require('../models/index');
const dammyData = require('./dammyData');

const addDammyData = () => {
    playerModel.findAll()
        .then(result => {
            console.log(result.length)
            if (result.length == 0) {
                playerModel.bulkCreate(dammyData.players)
                    .then(() => {
                        return ownerModel.bulkCreate(dammyData.owners)
                    })
                    .then(
                        result => {

                            return stadiumModel.bulkCreate(dammyData.stadiums);
                        }

                    )
                    .then(() => {
                        availableHourModel.bulkCreate(dammyData.hours)
                    })
                    .catch(err => console.error(err));
            }
        })

        .catch(err => console.log(err));

}
module.exports = { addDammyData };
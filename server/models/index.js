const ownerModel = require('./owner.model');
const playerModel = require('./player.model');
const stadiumModel = require('./stadium.model');
const availableHourModel = require('./availableHour.model');
const contactModel = require('./contact.model')


ownerModel.hasMany(stadiumModel, {
    sourceKey: 'id',
    foreignKey: {
        name: 'ownerID', allowNull: false,
    },
});
stadiumModel.belongsTo(ownerModel, {
    targetKey: 'id',
    foreignKey: {
        name: 'ownerID', allowNull: false,
    },
    onDelete: 'CASCADE',
});

module.exports = {
    ownerModel,
    playerModel,
    stadiumModel,
    availableHourModel,
    contactModel
};
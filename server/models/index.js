const ownerModel = require('./owner.model');
const playerModel = require('./player.model');
const stadiumModel = require('./stadium.model');
const availableHourModel = require('./availableHour.model');
const contactModel = require('./contact.model')
const reservationModel = require('./reservation.model')

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
stadiumModel.hasMany(reservationModel, {
    sourceKey: 'id',
    foreignKey: {
        name: 'stadiumId', allowNull: false,
    },
});
playerModel.hasMany(reservationModel, {
    sourceKey: 'id',
    foreignKey: {
        name: 'playerId', allowNull: false,
    },
});
reservationModel.belongsTo(playerModel, {
    targetKey: 'id',
    foreignKey: {
        name: 'playerId', allowNull: false,
    },
    onDelete: 'CASCADE',
});
reservationModel.belongsTo(stadiumModel, {
    targetKey: 'id',
    foreignKey: {
        name: 'stadiumId', allowNull: false,
    },
    onDelete: 'CASCADE',
});

module.exports = {
    ownerModel,
    playerModel,
    stadiumModel,
    availableHourModel,
    contactModel, 
    reservationModel,
};
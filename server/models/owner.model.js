const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

const ownerModel = sequelize.define("owner", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false, },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true,
    },
    password: { type: DataTypes.STRING, allowNull: false, },
    tel: { type: DataTypes.STRING, unique: true, allowNull: false, },
});

module.exports = ownerModel;

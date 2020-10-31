const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Informations extends Model{};

Informations.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    picture:{
        type: DataTypes.BLOB("long"),
        allowNull:false
    },
    file:{
        type: DataTypes.BLOB("long"),
        allowNull:false
    }
}, {sequelize})

module.exports = Informations;
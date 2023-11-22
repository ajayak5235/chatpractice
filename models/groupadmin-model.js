const Sequelize = require('sequelize');

const sequelize = require('../util/database')
const GroupAdmins = sequelize.define('groupadmins',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
});
module.exports = GroupAdmins;
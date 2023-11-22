const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Admin = sequelize.define('admins',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
});
module.exports = Admin;
const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('chatagain','root','12345',{
    dialect:'mysql',
    host:'localhost'
})
module.exports = sequelize;
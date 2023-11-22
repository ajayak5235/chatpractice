const Sequelize = require('sequelize');

const sequelize = require('../util/database')

const Member = sequelize.define('member',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
})

module.exports = Member;
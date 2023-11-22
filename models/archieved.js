const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const ArchievedMessages = sequelize.define('archievedmessages',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    message:{
        type:Sequelize.STRING,
        allowNull:true,
        validate:{
            len:[1,1000],
        },
    },
    file:{
        type:Sequelize.STRING,
        allowNull:true
    },
    UserId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    groupId:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
})
module.exports = ArchievedMessages
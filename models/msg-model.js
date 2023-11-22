const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Message = sequelize.define('message',{

     id:{
       type:Sequelize.INTEGER,
       autoIncrement:true,
       autoNull:false,
       primaryKey: true
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
    }
})

module.exports = Message;
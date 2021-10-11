const { TEXT } = require("sequelize");
const Sequelize = require("sequelize");
const conection = require("./banco");


const users = conection.define('users',{
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
    token:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

users.sync({force: false}).then(() =>{
    console.log("Tabela criada!");
});

module.exports = users;
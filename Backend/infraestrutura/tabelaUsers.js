const { TEXT } = require("sequelize");
const Sequelize = require("sequelize");
const conection = require("./conexao");

const users = conection.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    eMail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ultimoAcesso:{
        type: Sequelize.STRING,
        allowNull: true
    },
    admin: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
    
});

users.sync({force: false}).then(() =>{
    console.log("Tabela users criada!");
}); 

module.exports = users
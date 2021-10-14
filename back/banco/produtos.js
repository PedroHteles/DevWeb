const { TEXT } = require("sequelize");
const Sequelize = require("sequelize");
const conection = require("./banco");

const produtos = conection.define('produtos',{
    produtoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeProduto:{
        type: Sequelize.STRING,
        allowNull: false
    },
    precoProduto:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricaoProduto:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

produtos.sync({force: false}).then(() =>{
    console.log("Tabela criada!");
});

module.exports = produtos;
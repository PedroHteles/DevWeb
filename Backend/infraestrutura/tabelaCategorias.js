const { TEXT } = require("sequelize");
const Sequelize = require("sequelize");
const conection = require("../infraestrutura/conexao");

const categorias = conection.define('categorias',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeCategoria: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

categorias.sync({force: false}).then(() =>{
    console.log("Tabela categorias criada!");
}); 

module.exports = categorias
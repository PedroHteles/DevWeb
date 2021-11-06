const Sequelize = require("sequelize");
const conection = require("../infraestrutura/conexao");

const carrinho = conection.define('carrinho',{  
    id_usuario: {
        type: Sequelize.INTEGER
         
    },
    id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.FLOAT, 
        allowNull: false
    },
});

carrinho.sync({force: false}).then(() =>{
    console.log("Tabela carrinho criada!");
}); 

module.exports = carrinho
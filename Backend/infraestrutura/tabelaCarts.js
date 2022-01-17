const Sequelize = require("sequelize");
const conection = require("../infraestrutura/conexao");

const carrinho = conection.define('carrinho',{  
    eMail: {
        type: Sequelize.STRING
         
    },
    idProduto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER, 
        allowNull: false
    },
});

carrinho.sync({force: false}).then(() =>{
    console.log("Tabela carrinho criada!");
}); 

module.exports = carrinho
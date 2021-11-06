const Sequelize = require('sequelize');

const connection = new Sequelize('compreArcom','root','password',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

//roda issaq no mysql se n n roda ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123'; 
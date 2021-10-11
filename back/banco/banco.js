const Sequelize = require('sequelize');

const connection = new Sequelize('sitezin','root','password',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
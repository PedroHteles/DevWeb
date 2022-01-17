const Sequelize = require('sequelize');

const connection = new Sequelize('SitezimAc','root','password',{
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});

module.exports = connection;

//roda issaq no mysql se n n roda ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123'; 
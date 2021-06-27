const Sequelize =require('sequelize');

const sequelize = new Sequelize(
  'db_sager_drone', //name database
  'root', //use name
  'root', //password
  {
    dialect: 'mysql',
    host: 'localhost',
    define:{
      timestamps:false,
      freezeTableName:true,
    },
    operatorsAliases: false,
    pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000,
    }

  });

  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.tblUser = require('./models/user')(sequelize, Sequelize);
 

  module.exports = db;

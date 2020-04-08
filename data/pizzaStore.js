const Sequelize = require('sequelize');

const database = 'pizza_luvrs';
const host = 'pizza-db.cp5mlpfkcl0i.eu-west-3.rds.amazonaws.com';
const username = 'postgres';
const password = 'postgres';

const pgClient = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
});

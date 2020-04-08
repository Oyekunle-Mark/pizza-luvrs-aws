const Sequelize = require('sequelize');

const database = 'pizza_luvrs';
const host = 'pizza-db.cp5mlpfkcl0i.eu-west-3.rds.amazonaws.com';
const username = 'postgres';
const password = 'postgres';

const pgClient = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
});

const Pizza = pgClient.define('pizza', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  toppings: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  created: {
    type: Sequelize.BIGINT,
  },
});

Pizza.sync().then(() => {
  console.log('Postgres connection ready');
});

module.exports = Pizza;

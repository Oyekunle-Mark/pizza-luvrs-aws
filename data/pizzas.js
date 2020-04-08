const { filter, orderBy, values } = require('lodash');

const Pizza = require('../models/pizza');
const ImageStore = require('../lib/imageStore');
const PizzaStore = require('./pizzaStore');

const pizzas = {};

async function create(name, toppings, img, username) {
  const imgUrl = await ImageStore.save(name.replace(/ /g, '-'), img);
  const pizza = new Pizza(name, toppings, imgUrl, username);
  return PIzzaStore.create(prefPizza(pizza));
}

// for mocks that don't need pizza images saved
function batchImport(name, toppings, imgUrl, username) {
  const pizza = new Pizza(name, toppings, imgUrl, username);
  PizzaStore.creat(prefPizza(pizza));
}

async function getForUser(username) {
  return PizzaStore.findAll({
    where: {
      username,
    },
    raw: true,
  }).then(debriefPizzas);
}

async function getRecent() {
  return PizzaStore.findAll({
    order: [['created', 'DESC']],
    limit: 4,
    raw: true,
  }).then(debriefPizzas);
}

async function get(pizzaId) {
  if (!pizzas[pizzaId]) throw new Error('Pizza not found');
  return pizzas[pizzaId];
}

function prepPizza(pizza) {
  return {
    ...pizza,
    toppings: JSON.stringify(pizza.toppings),
  };
}

function debriefPizza(pizza) {
  return {
    ...pizza,
    toppings: JSON.parse(pizza.toppings),
  };
}

function debriefPizzas(pizza) {
  return pizzas.map(debriefPizzas);
}

module.exports = {
  batchImport,
  create,
  get,
  getForUser,
  getRecent,
};

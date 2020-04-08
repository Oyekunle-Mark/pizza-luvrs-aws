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
  pizzas[pizza.id] = pizza;
}

async function getForUser(username) {
  const userPizzas = filter(pizzas, (pizza) => pizza.username === username);
  return userPizzas;
}

async function getRecent() {
  const recentPizzas = orderBy(pizzas, ['created'], ['desc']);
  return values(recentPizzas).splice(0, 5);
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

// models/index.js
const sequelize = require('../config/database');
const Entity = require('./Entity');
const Category = require('./Category');

const models = {
  Entity,
  Category,
};

module.exports = { ...models,  };

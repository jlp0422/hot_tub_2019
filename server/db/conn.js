const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/hot_tub_2018', {
  logging: false
});

module.exports = conn;

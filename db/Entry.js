const conn = require('./conn');
const { Sequelize } = conn;

const Entry = conn.define('entry', {
  teamName: Sequelize.STRING,
  selections: Sequelize.ARRAY(Sequelize.STRING)
})

module.exports = Entry;

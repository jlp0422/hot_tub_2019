const conn = require('./conn');
const Entry = require('./Entry');

// add force true to drop table, add 2018 teams
const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
    Entry
  }
}

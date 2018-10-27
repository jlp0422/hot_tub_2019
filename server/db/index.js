const conn = require('./conn');
const Entry = require('./Entry');

const sync = () => conn.sync()

module.exports = {
  sync,
  models: {
    Entry
  }
}

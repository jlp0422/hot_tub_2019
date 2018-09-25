const app = require('express').Router();
const msfTwo = require('../server.js');

app.get('/', (req, res, next) => {
  Promise.all([
    msfTwo.getData('nfl', '2018-regular', 'seasonal_standings', 'json', { stats: 'Wins', force: true })
  ])
    .then(resp => res.send(resp))
    .catch(next)
})

module.exports = app;

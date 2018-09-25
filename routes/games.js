const app = require('express').Router();
const msfTwo = require('../server.js');

app.get('/weekly/regular/2018/:week', (req, res, next) => {
  const { week } = req.params
  Promise.all([
    msfTwo.getData('nfl', '2018-regular', 'weekly_games', 'json', { week: week, force: true })
  ])
    .then(resp => res.send(resp))
    .catch(next)
})

module.exports = app;

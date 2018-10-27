const app = require('express').Router();
const { msfTwo, asyncMiddleware } = require('../utils.js');

app.get('/', asyncMiddleware(async (req, res, next) => {
  const response = await msfTwo.getData('nfl', '2018-regular', 'seasonal_standings', 'json', { stats: 'W', force: true })
  res.send(response)
}))

module.exports = app;

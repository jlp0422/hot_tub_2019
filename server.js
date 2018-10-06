const express = require('express');
const app = express();
const db = require('./db');
const { sync } = db;
const MySportsFeeds  = require('mysportsfeeds-node');
const path = require('path');
require('dotenv').config()

const msfTwo = new MySportsFeeds('2.0', true);
msfTwo.authenticate('b57b9597-7a4b-4b7b-b6b7-10fd58', 'MYSPORTSFEEDS');

app.use('/dist', express.static(path.join(__dirname, './dist')));
app.use('/vendor', express.static(path.join(__dirname, './node_modules')));
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/api/entries', require('./routes/entries'));
// app.use('/api', require('./routes/api'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`port of call: ${port}`))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/api/games/weekly/regular/2018/:week', (req, res, next) => {
  const { week } = req.params
  Promise.all([
    msfTwo.getData('nfl', '2018-regular', 'weekly_games', 'json', { week, force: true })
  ])
  .then(resp => res.send(resp))
  .catch(err => res.send(err))
})

app.get('/api/standings', (req, res, next) => {
  Promise.all([
    msfTwo.getData('nfl', '2018-regular', 'seasonal_standings', 'json', { stats: 'W', force: true })
  ])
    .then(resp => res.send(resp))
    .catch(err => res.send(err))
    // .catch(next)
})

sync()

// module.exports = { msfTwo }

const express = require('express');
const app = express();
const db = require('./db');
const { sync } = db;
const MySportsFeeds  = require('mysportsfeeds-node');
const axios = require('axios');
const btoa = require('btoa');
const path = require('path');

var msfOne = new MySportsFeeds("1.2", true);
msfOne.authenticate('b57b9597-7a4b-4b7b-b6b7-10fd58', "Rollingwood9Orange");

const msfTwo = new MySportsFeeds('2.0', true)
msfTwo.authenticate('b57b9597-7a4b-4b7b-b6b7-10fd58', 'MYSPORTSFEEDS')

app.use('/dist', express.static(path.join(__dirname, './dist')));
app.use('/vendor', express.static(path.join(__dirname, './node_modules')));
app.use('/api/entries', require('./routes/entries'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`port of call: ${port}`))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/weekly-games', (req, res, next) => {
  Promise.all([
    msfTwo.getData('nfl', '2018-regular', 'weekly_games', 'json', { week: '12' })
  ])
  .then(resp => res.send(resp))
  .catch(next)
})

app.get('/api/standings', (req, res, next) => {
  Promise.all([
    msfTwo.getData('nfl', '2018-regular', 'seasonal_standings', 'json', { stats: 'Wins', force: true })
  ])
    .then(resp => res.send(resp))
    .catch(next)
})


app.get('/api/standings/:team', (req, res, next) => {
  const { team } = req.params
  console.log('*******TEAM REQUEST: ', team)
  Promise.all([
    msfTwo.getData('nfl', '2018-regular', 'seasonal_standings', 'json', { team: `${team}`, stats: 'Wins', force: true })
  ])
    .then(resp => res.send(resp))
    .catch(next)
})

sync()

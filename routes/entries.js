const app = require('express').Router()
const { Entry } = require('../db').models

app.use('/', (req, res, next) => {
  Entry.findAll()
    .then(entries => res.send(entries))
    .catch(next)
})

module.exports = app;

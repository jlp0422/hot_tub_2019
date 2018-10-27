const app = require('express').Router()
const { Entry } = require('../db').models

app.use('/:id', (req, res, next) => {
  Entry.findById(req.params.id)
    .then(entry => res.send(entry))
    .catch(next)
})

app.use('/', (req, res, next) => {
  Entry.findAll({
    order: [ ['teamName', 'ASC'] ]
  })
    .then(entries => res.send(entries))
    .catch(next)
})

module.exports = app;

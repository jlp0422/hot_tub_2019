const app = require('express').Router()

// app.use('/entries', require('./entries'))
app.use('/games', require('./games'))
app.use('/standings', require('./standings'))

module.exports = app

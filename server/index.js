const express = require('express')
const app = express()
const { sync } = require('./db')
const path = require('path')
require('dotenv').config()

app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')))
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/api', require('./routes/api'))

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '../public/index.html'))
)

app.use((err, req, res) => res.status(err.status || 500).send(err))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`port of call: ${port}`))

sync()

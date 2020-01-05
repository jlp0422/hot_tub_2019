const app = require('express').Router()
const { msfTwo, asyncMiddleware } = require('../utils.js')

app.get(
	'/',
	asyncMiddleware(async (req, res) => {
		const regularSeason = await msfTwo.getData(
			'nfl',
			'2019-regular',
			'seasonal_standings',
			'json',
			{ stats: 'W', force: true }
		)
		const playoffs = await msfTwo.getData(
			'nfl',
			'2020-playoff',
			'seasonal_games',
			'json',
			{ force: true }
		)
		res.send({ regularSeason, playoffs })
	})
)

module.exports = app

const app = require('express').Router()
const { msfTwo, asyncMiddleware } = require('../utils.js')

app.get(
	'/',
	asyncMiddleware(async (req, res) => {
		const regularSeason = await msfTwo.getData(
			'nfl',
			'2023-regular',
			'seasonal_standings',
			'json',
			{ stats: 'W', force: true }
		)
		// TODO: uncomment once playoffs start, this will error out before there is any playoff data
		// const playoffs = await msfTwo.getData(
		// 	'nfl',
		// 	'2024-playoff',
		// 	'seasonal_games',
		// 	'json',
		// 	{ force: true }
		// )
		// res.send({ regularSeason, playoffs })
		res.send({ regularSeason })
	})
)

module.exports = app

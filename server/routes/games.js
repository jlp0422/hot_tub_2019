const app = require('express').Router()
const { msfTwo, asyncMiddleware } = require('../utils.js')

app.get(
	'/weekly/regular/2021/:week',
	asyncMiddleware(async (req, res) => {
		const { week } = req.params
		const seasonType = week < 18 ? '2021-regular' : '2022-playoff'
		const response = await msfTwo.getData(
			'nfl',
			seasonType,
			'weekly_games',
			'json',
			{ week, force: true }
		)
		res.send(response)
	})
)

app.get(
	'/seasonal/regular/2021/:teams',
	asyncMiddleware(async (req, res) => {
		const { teams } = req.params
		const response = await msfTwo.getData(
			'nfl',
			'2021-regular',
			'seasonal_games',
			'json',
			{ stats: 'games', status: 'final', team: `${teams}`, force: true }
		)
		res.send(response)
	})
)

module.exports = app

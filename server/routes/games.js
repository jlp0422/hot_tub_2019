const app = require('express').Router()
const { msfTwo, asyncMiddleware } = require('../utils.js')

app.get(
	'/weekly/regular/2022/:week',
	asyncMiddleware(async (req, res) => {
		const { week } = req.params
		const seasonType = week < 19 ? '2022-regular' : '2023-playoff'
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
	'/seasonal/regular/2022/:teams',
	asyncMiddleware(async (req, res) => {
		const { teams } = req.params
		const response = await msfTwo.getData(
			'nfl',
			'2022-regular',
			'seasonal_games',
			'json',
			{ stats: 'games', status: 'final', team: `${teams}`, force: true }
		)
		res.send(response)
	})
)

module.exports = app

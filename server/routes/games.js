const app = require('express').Router()
const { msfTwo, asyncMiddleware } = require('../utils.js')

app.get(
	'/weekly/regular/2019/:week',
	asyncMiddleware(async (req, res) => {
		const { week } = req.params
		const seasonType = week < 18 ? '2019-regular' : '2020-playoff'
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
	'/seasonal/regular/2019/:teams',
	asyncMiddleware(async (req, res) => {
		const { teams } = req.params
		const response = await msfTwo.getData(
			'nfl',
			'2019-regular', // change to 2019
			'seasonal_games',
			'json',
			{ stats: 'games', status: 'final', team: `${teams}`, force: true }
		)
		res.send(response)
	})
)

module.exports = app

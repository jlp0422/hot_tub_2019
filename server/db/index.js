const Sequelize = require('sequelize')
const conn = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost/hot_tub_nfl_2019',
	{
		logging: false
	}
)

const Entry = conn.define('entry', {
	teamName: Sequelize.STRING,
	selections: Sequelize.ARRAY(Sequelize.STRING)
})

const sync = () => conn.sync()

const seed = () => {
	return Promise.all([{ teamName: 'test', selections: ['MIA', 'NYJ'] }])
}

module.exports = {
	sync,
	seed,
	models: {
		Entry
	}
}

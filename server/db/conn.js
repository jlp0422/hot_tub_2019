const Sequelize = require('sequelize')
const conn = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost/hot_tub_nfl_2019',
	{
		logging: false
	}
)

module.exports = conn

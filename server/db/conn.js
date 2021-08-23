const Sequelize = require('sequelize')
const conn = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost/hot_tub_nfl_2019',
	{
		logging: false,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false
			},
			keepAlive: true
		},
		ssl: true
	}
)

module.exports = conn

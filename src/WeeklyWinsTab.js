import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactGA from 'react-ga'
import Loading from './shared/Loading'
import { allGamesToWeeksObject, totalWinsForWeek } from './utils'

class WeeklyWinsTab extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			winsPerWeekObject: {},
			error: ''
		}
	}

	componentDidMount() {
		ReactGA.event({
			category: 'change tab',
			action: 'Weekly Wins Tab'
		})
		const { entry } = this.props
		const apiTeams = entry.selections.join(',')
		axios
			.get(`/api/games/seasonal/regular/2022/${apiTeams}`)
			.then(resp => resp.data.games)
			.then(allGames => allGamesToWeeksObject(allGames))
			.then(gamesPerWeek => totalWinsForWeek(gamesPerWeek, entry.selections))
			.then(winsPerWeekObject => this.setState({ winsPerWeekObject }))
			.catch(error => {
				this.setState({ error })
				throw Error('Network error.')
			})
	}

	componentDidUnmount() {
		this.setState({ error: '' })
	}

	render() {
		const { winsPerWeekObject, error } = this.state
		return (
			<div>
				{error && <h4>Network error. Please refresh.</h4>}
				{!error && !Object.keys(winsPerWeekObject).length ? (
					<Loading />
				) : (
					Object.keys(winsPerWeekObject).map(weekName => {
						const weekNumber = Number(weekName.split(' ')[1])
						return (
							<div
								key={weekName}
								className="grid entry-padding"
								style={{
									gridTemplateColumns: '45% 45%',
									gridColumnGap: '5%',
									backgroundColor: `${weekNumber % 2 ? '#eee' : '#d8d8d8'}`
								}}
							>
								<Link
									className="link"
									to={`/standings/weekly?week=${weekNumber}`}
								>
									<h4>{weekName}</h4>
								</Link>
								<h4>{winsPerWeekObject[weekName]} wins</h4>
							</div>
						)
					})
				)}
			</div>
		)
	}
}

export default WeeklyWinsTab

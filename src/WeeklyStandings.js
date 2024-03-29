import React from 'react'
import axios from 'axios'
import ReactGA from 'react-ga'
import Entry from './Entry'
import Loading from './shared/Loading'
import TableHeader from './shared/TableHeader'
import ButtonGroup from './shared/ButtonGroup'
import { makeSentenceCase, sortByWeekScore, sortByName, weeks } from './utils'

class WeeklyStandings extends React.Component {
	constructor(props) {
		super(props)
		const latestWeek = weeks
			.filter(week => new Date() >= week.firstGame)
			.reduce((memo, week) => (memo.firstGame >= week.firstGame ? memo : week))
			.number
		this.state = {
			isNameSorted: false,
			activeWeek:
				Number(this.props.history.location.search.split('=')[1]) || latestWeek,
			weeklyWins: {},
			error: ''
		}
		this.onChangeSortOrder = this.onChangeSortOrder.bind(this)
	}

	componentDidMount() {
		ReactGA.pageview('/standings/weekly')
		this.onSelectWeek(this.state.activeWeek)
	}

	makeGamesCall(gamesWeek) {
		ReactGA.event({
			category: 'Change week',
			action: `Week ${gamesWeek}`
		})
		this.setState({ error: '' })
		if (!this.state.weeklyWins[gamesWeek]) {
			axios
				.get(`/api/games/weekly/regular/2023/${gamesWeek}`)
				.then(resp => resp.data)
				.then(schedule => schedule.games)
				.then(games => {
					const weeklyWinners = games.map(game => {
						if (game.schedule.playedStatus === 'COMPLETED') {
							if (game.score.awayScoreTotal > game.score.homeScoreTotal) {
								return game.schedule.awayTeam.abbreviation
							} else if (
								game.score.awayScoreTotal < game.score.homeScoreTotal
							) {
								return game.schedule.homeTeam.abbreviation
							}
						}
					})
					const winsPerEntry = this.props.entries.map(entry => {
						const totalWins = entry.selections.reduce((winMemo, team) => {
							if (weeklyWinners.includes(team)) {
								winMemo++
							}
							return winMemo
						}, 0)
						return {
							id: entry.id,
							teamName: entry.teamName,
							entryScore: totalWins
						}
					})
					const newWeeklyWins = this.state.weeklyWins
					newWeeklyWins[gamesWeek] = winsPerEntry
					this.setState({ weeklyWins: newWeeklyWins })
				})
				.catch(error => this.setState({ error }))
		}
	}

	onSelectWeek(week) {
		this.setState({ activeWeek: week })
		this.props.history.push(`/standings/weekly?week=${week}`)
		this.makeGamesCall(week)
	}

	onChangeSortOrder(type) {
		this.setState({ isNameSorted: !this.state.isNameSorted })
		ReactGA.event({
			category: 'Change sort',
			action: type
		})
	}

	render() {
		const currentDate = new Date()
		const { isNameSorted, activeWeek, weeklyWins, error } = this.state
		const { onChangeSortOrder } = this
		const { width } = this.props
		return (
			<div>
				<h2>Week {activeWeek} Standings</h2>
				<ButtonGroup
					buttonAction={'Sort by'}
					isSort={true}
					copyLeft={'Team Name'}
					disabledLeft={isNameSorted}
					sortLeft={() => onChangeSortOrder('team')}
					copyRight={'Wins'}
					disabledRight={!isNameSorted}
					sortRight={() => onChangeSortOrder('score')}
				/>
				<ul className="nav nav-tabs nav-fill margin-b-15">
					{weeks.map(
						week =>
							currentDate >= week.firstGame && (
								<li key={week.number} className="nav-item">
									<span
										onClick={() => this.onSelectWeek(week.number)}
										className={`nav-link ${activeWeek === week.number &&
											'active font-weight-bold'}`}
									>
										{week.text}
									</span>
								</li>
							)
					)}
				</ul>
				{error ? (
					<h4>Network error. Please refresh.</h4>
				) : !weeklyWins[activeWeek] ? (
					<Loading />
				) : (
					<div>
						<TableHeader width={width} />
						{isNameSorted
							? weeklyWins[activeWeek]
									.sort(sortByName)
									.map((entry, idx) => (
										<Entry
											key={entry.teamName}
											makeSentenceCase={makeSentenceCase}
											entry={entry}
											rank={idx}
											page={'weeklyStandings'}
										/>
									))
							: weeklyWins[activeWeek]
									.sort(sortByWeekScore)
									.map((entry, idx) => (
										<Entry
											key={entry.teamName}
											makeSentenceCase={makeSentenceCase}
											entry={entry}
											scoreSorted={true}
											rank={idx}
											page={'weeklyStandings'}
										/>
									))}
					</div>
				)}
			</div>
		)
	}
}

export default WeeklyStandings

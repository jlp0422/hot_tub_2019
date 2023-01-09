import React from 'react'
import { Switch, HashRouter as Router, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import windowSize from 'react-window-size'
import Nav from './Nav'
import Loading from './shared/Loading'
import Standings from './Standings'
import TeamEntry from './TeamEntry'
import Team from './Team'
import NFLStandings from './NFLStandings'
import WeeklyStandings from './WeeklyStandings'
import FourOhFour from './shared/FourOhFour'
// import ChartsMain from './charts/ChartsMain'
import { parsePlayoffGames } from './utils'
import hotTubEntries from './entries'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			entries: hotTubEntries,
			teamWinMap: {},
			teamCityName: {},
			teamStandings: {},
			playoffWinMap: {}
		}
	}

	componentDidMount() {
		axios
			.get('/api/standings')
			.then(res => res.data)
			.then(({ regularSeason, playoffs }) => ({
				teamsAndStats: regularSeason.teams,
				playoffGames: playoffs
			}))
			.then(({ teamsAndStats, playoffGames }) => {
				const teamCityName = teamsAndStats.reduce((memo, team) => {
					memo[team.team.abbreviation] = `${team.team.city} ${team.team.name}`
					return memo
				}, {})
				const teamWinMap = teamsAndStats.reduce((memo, team) => {
					memo[team.team.abbreviation] = team.stats.standings.wins
					return memo
				}, {})
				const teamStandings = teamsAndStats.reduce((memo, team) => {
					if (memo[team.divisionRank.divisionName]) {
						memo[team.divisionRank.divisionName].push({
							teamAbbrev: team.team.abbreviation,
							gamesBack: team.divisionRank.gamesBack,
							wins: team.stats.standings.wins,
							rank: team.divisionRank.rank
						})
					} else {
						memo[team.divisionRank.divisionName] = [
							{
								teamAbbrev: team.team.abbreviation,
								gamesBack: team.divisionRank.gamesBack,
								wins: team.stats.standings.wins,
								rank: team.divisionRank.rank
							}
						]
					}
					return memo
				}, {})
				const playoffWinMap = parsePlayoffGames(playoffGames)
				return { teamCityName, teamWinMap, teamStandings, playoffWinMap }
			})
			.then(({ teamWinMap, teamCityName, teamStandings, playoffWinMap }) =>
				this.setState({
					teamWinMap,
					teamCityName,
					teamStandings,
					playoffWinMap
				})
			)
	}

	render() {
		const {
			entries,
			teamWinMap,
			teamCityName,
			teamStandings,
			playoffWinMap
		} = this.state
		const { windowWidth } = this.props
		const divisionLeaders = [
			{
				rank: 1,
				teamAbbrev: 'KC'
			},
			{
				rank: 1,
				teamAbbrev: 'MIN'
			},
			{
				rank: 1,
				teamAbbrev: 'SF'
			},
			{
				rank: 1,
				teamAbbrev: 'BUF'
			},
			{
				rank: 1,
				teamAbbrev: 'CIN'
			},
			{
				rank: 1,
				teamAbbrev: 'JAX'
			},
			{
				rank: 1,
				teamAbbrev: 'PHI'
			},
			{
				rank: 1,
				teamAbbrev: 'TB'
			}
		]
		if (!entries.length || !Object.keys(teamWinMap).length) {
			return <Loading home={true} />
		}
		return (
			<div className="container">
				<h1>Hot Tub 2022</h1>
				<Router>
					<div>
						<Route path="/" component={Nav} />
						<Switch>
							<Route
								exact
								path="/"
								render={() => <Redirect to="/standings/hot-tub" />}
							/>
							<Route
								exact
								path="/standings/hot-tub"
								render={() => (
									<Standings
										entries={entries}
										teamWinMap={teamWinMap}
										playoffWinMap={playoffWinMap}
										teamCityName={teamCityName}
										divisionLeaders={divisionLeaders}
										width={windowWidth}
									/>
								)}
							/>
							<Route
								exact
								path="/standings/nfl"
								render={() => (
									<NFLStandings
										teamCityName={teamCityName}
										standings={teamStandings}
										width={windowWidth}
									/>
								)}
							/>
							<Route
								exact
								path="/standings/weekly"
								render={({ history }) => (
									<WeeklyStandings
										history={history}
										entries={entries}
										width={windowWidth}
									/>
								)}
							/>
							<Route
								exact
								path="/entry/:id"
								render={({ match, history }) => (
									<TeamEntry
										id={match.params.id}
										entries={entries}
										teamWinMap={teamWinMap}
										teamCityName={teamCityName}
										history={history}
										divisionLeaders={divisionLeaders}
										playoffWinMap={playoffWinMap}
										width={windowWidth}
										entry={entries.find(
											entry => entry.id === Number(match.params.id)
										)}
									/>
								)}
							/>
							<Route
								exact
								path="/teams/:abbrev"
								render={({ match }) => (
									<Team
										abbrev={match.params.abbrev}
										entries={entries}
										teamCityName={teamCityName}
										teamWinMap={teamWinMap}
									/>
								)}
							/>
							{/* <Route
								path="/charts"
								render={() => (
									<ChartsMain
										entries={entries}
										teamWinMap={teamWinMap}
										divisionLeaders={divisionLeaders}
									/>
								)}
							/> */}
							<Route component={FourOhFour} />
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}

export default windowSize(App)

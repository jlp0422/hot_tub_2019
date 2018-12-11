import React from 'react';
import { Switch, HashRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Loading from './reusable/Loading';
import Standings from './Standings';
import TeamEntry from './TeamEntry';
import Team from './Team';
import NFLStandings from './NFLStandings';
import WeeklyStandings from './WeeklyStandings';
import FourOhFour from './reusable/FourOhFour';
import ChartsMain from './charts/ChartsMain';
import windowSize from "react-window-size";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      teamWinMap: {},
      teamCityName: {},
      teamStandings: {}
    }
  }

  componentDidMount() {
    axios.get('/api/entries')
      .then(res => res.data)
      .then(entries => this.setState({ entries }))
    axios.get('/api/standings')
      .then(res => res.data)
      .then(fullStats => fullStats.teams)
      .then(teamsAndStats => {
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
          }
          else {
            memo[team.divisionRank.divisionName] = [{
              teamAbbrev: team.team.abbreviation,
              gamesBack: team.divisionRank.gamesBack,
              wins: team.stats.standings.wins,
              rank: team.divisionRank.rank
            }]
          }
          return memo
        }, {})
        return { teamCityName, teamWinMap, teamStandings }
      })
      .then(({ teamWinMap, teamCityName, teamStandings }) => this.setState({ teamWinMap, teamCityName, teamStandings }))
  }

  render() {
    const { entries, teamWinMap, teamCityName, teamStandings } = this.state
    const divisionLeaders = []
    const { windowWidth } = this.props
    for (let key in teamStandings) {
      divisionLeaders.push(teamStandings[key].find(team => team.rank === 1))
    }
    if (!entries.length || !Object.keys(teamWinMap).length) return <Loading home={true}/>
    return (
      <div className="container">
        <h1>Hot Tub 2018</h1>
        <Router>
          <div>
            <Route path='/' component={Nav} />
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/standings/hot-tub' />} />
              <Route exact path='/standings/hot-tub' render={() => (
                <Standings
                  entries={entries}
                  teamWinMap={teamWinMap}
                  teamCityName={teamCityName}
                  divisionLeaders={divisionLeaders}
                  width={ windowWidth }
                />
              )} />
              <Route exact path='/standings/nfl' render={() => (
                <NFLStandings
                  teamCityName={teamCityName}
                  standings={teamStandings}
                  width={ windowWidth }
                />
              )} />
              <Route exact path='/standings/weekly' render={({ history }) => (
                <WeeklyStandings
                  history={history}
                  entries={entries}
                />
              )} />
              <Route exact path='/entry/:id' render={({ match, history }) => (
                <TeamEntry
                  id={match.params.id}
                  entries={entries}
                  teamWinMap={teamWinMap}
                  teamCityName={teamCityName}
                  history={ history }
                  divisionLeaders={divisionLeaders}
                  width={ windowWidth }
                />
              )} />
              <Route exact path='/teams/:abbrev' render={({ match }) => (
                <Team
                  abbrev={match.params.abbrev}
                  entries={entries}
                  teamCityName={teamCityName}
                  teamWinMap={teamWinMap}
                />
              )} />
              <Route path='/charts' render={() => (
                <ChartsMain
                  entries={ entries }
                  teamWinMap={ teamWinMap }
                  divisionLeaders={ divisionLeaders }
                />
              )} />
              <Route component={FourOhFour} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default windowSize(App);

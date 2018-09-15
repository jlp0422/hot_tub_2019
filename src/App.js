import React from 'react';
import { Switch, HashRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Standings from './Standings';
import TeamEntry from './TeamEntry';
import Teams from './Teams';
import Team from './Team';
import NFLStandings from './NFLStandings';

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
      .then(fullStats => fullStats[0].teams)
      .then(teamsAndStats => {
        const teamCityName = teamsAndStats.reduce((memo, team) => {
          memo[team.team.abbreviation ] = `${team.team.city} ${team.team.name}`
          return memo
        }, {})
        const teamWinMap = teamsAndStats.reduce((memo, team) => {
          memo[team.team.abbreviation] = team.stats.standings.wins
          return memo
        }, {})
        const teamStandings = teamsAndStats.reduce((memo, team) => {
          if (memo[team.divisionRank.divisionName]) {
            memo[team.divisionRank.divisionName].push({ teamAbbrev: team.team.abbreviation, gamesBack: team.divisionRank.gamesBack, wins: team.stats.standings.wins, rank: team.divisionRank.rank })
          }
          else {
            memo[team.divisionRank.divisionName] = [{ teamAbbrev: team.team.abbreviation, gamesBack: team.divisionRank.gamesBack, wins: team.stats.standings.wins, rank: team.divisionRank.rank }]
          }
          return memo
        }, {})
        return { teamCityName, teamWinMap, teamStandings }
      })
      .then(({ teamWinMap, teamCityName, teamStandings }) => this.setState({ teamWinMap, teamCityName, teamStandings }))
  }

  render() {
    const { entries, teamWinMap, teamCityName, teamStandings } = this.state
    if (!entries.length || !Object.keys(teamWinMap).length) return <Loading />
    return (
      <div className="container" style={{ marginBottom: '60px', marginTop: '20px' }}>
        <h1>Hot Tub 2018 Standings</h1>
        <Router>
          <div>
            <Link to='/standings/hot-tub'><h4>Hot Tub Standings</h4></Link>
            <Link to='/teams'><h4>NFL Teams</h4></Link>
            <Link to='/standings/nfl'><h4>NFL Standings</h4></Link>
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/standings/hot-tub' />} />
              <Route exact path='/standings/hot-tub' render={() => (
                <Standings
                  entries={ entries }
                  teamWinMap={ teamWinMap }
                />
              )} />
              <Route exact path='/standings/nfl' render={() => (
                <NFLStandings
                  teamCityName={teamCityName}
                  standings={teamStandings}
                />
              )} />
              <Route exact path='/entry/:id' render={({ match }) => (
                <TeamEntry
                  id={match.params.id}
                  entries={ entries }
                  teamWinMap={ teamWinMap }
                  teamCityName={ teamCityName }
                />
              )} />
              <Route exact path='/teams' render={() => (
                <Teams teamCityName={ teamCityName } />
              )} />
              <Route exact path='/teams/:abbrev' render={({ match }) => (
                <Team
                  abbrev={ match.params.abbrev }
                  entries={ entries }
                  teamCityName={ teamCityName }
                  teamWinMap={ teamWinMap }
                />
              )} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;

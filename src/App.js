import React from 'react';
import { Switch, HashRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Standings from './Standings';
import TeamEntry from './TeamEntry';
import Teams from './Teams';
import Team from './Team';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      teamWinMap: {},
      teamCityName: {}
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
        return { teamCityName, teamWinMap }
      })
      .then(({ teamWinMap, teamCityName }) => this.setState({ teamWinMap, teamCityName }))
  }

  render() {
    const { entries, teamWinMap, teamCityName } = this.state
    if (!entries.length || !Object.keys(teamWinMap).length) return <Loading />
    return (
      <div className="container" style={{ marginBottom: '60px', marginTop: '20px' }}>
        <h1>Hot Tub 2018 Standings</h1>
        <Router>
          <div>
            <Link to='/standings'><h4>Standings</h4></Link>
            <Link to='/teams'><h4>Teams</h4></Link>
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/standings' />} />
              <Route exact path='/standings' render={() => (
                <Standings
                  entries={ entries }
                  teamWinMap={ teamWinMap }
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

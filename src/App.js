import React from 'react';
import { Switch, HashRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Standings from './Standings';
import TeamEntry from './TeamEntry';

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
    if (!entries.length || !Object.keys(teamWinMap).length) {
      return (
        <div className="container" style={{ marginBottom: '60px', marginTop: '20px' }}>
          <h1>Hot Tub 2018 Standings</h1>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <div className="container" style={{ marginBottom: '60px', marginTop: '20px' }}>
        <h1>Hot Tub 2018 Standings</h1>
        <Router>
          <div>
            <Link to='/'><h4>Standings</h4></Link>
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
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;

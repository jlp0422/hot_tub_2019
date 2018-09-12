import React from 'react';
import axios from 'axios';
import Entry from './Entry';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      teamWinMap: {},
    }
    this.makeSentenceCase = this.makeSentenceCase.bind(this)
  }

  componentDidMount() {
    axios.get('/api/entries')
      .then(res => res.data)
      .then(entries => this.setState({ entries }))
    axios.get('/api/standings')
      .then(res => res.data)
      .then(fullStats => fullStats[0].teams)
      .then(teamsAndStats => {
        return teamsAndStats.reduce((memo, team) => {
          memo[team.team.abbreviation] = team.stats.standings.wins
          return memo
        }, {})
      })
      .then(teamWinMap => this.setState({ teamWinMap }))
  }

  makeSentenceCase(str) {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  render() {
    const { entries, teamWinMap } = this.state
    const { makeSentenceCase } = this
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    return (
      <div>
        {/*<h4>Last updated: {Date(lastUpdated)}</h4>*/}
        <div style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
          <div>
            <h2>Team Name</h2>
          </div>
          <div>
            <h2>Score</h2>
          </div>
        </div>
        { entries.map(entry => (
            <Entry
              key={ entry.id }
              makeSentenceCase={ makeSentenceCase}
              entry={ entry }
              teamWinMap={ teamWinMap }/>
        ))}
      </div>
    )
  }
}

export default Standings;

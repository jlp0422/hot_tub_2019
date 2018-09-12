import React from 'react';
import axios from 'axios';
import EntryScore from './EntryScore';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      teamWinMap: {},
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
        return teamsAndStats.reduce((memo, team) => {
          memo[team.team.abbreviation] = team.stats.standings.wins
          return memo
        }, {})
      })
      .then(teamWinMap => this.setState({ teamWinMap }))
  }

  render() {
    const { entries, teamWinMap, isLoading } = this.state
    const { makeSentenceCase } = this
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
          <div>
            <h2>Team Name</h2>
          </div>
          <div>
            <h2>Score</h2>
          </div>
        </div>
        {
          entries.map(entry => (
            <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
              <div>
                <h3>{entry.teamName}</h3>
              </div>
              <div>
                <EntryScore teamWinMap={ teamWinMap } entry={ entry } />
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Standings;

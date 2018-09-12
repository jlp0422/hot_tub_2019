import React from 'react';
import axios from 'axios';
import Entry from './Entry';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      teamWinMap: {},
      sortOrder: 'name'
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

  onSortEntries(a, b) {
    if (a.entryScore < b.entryScore)
      return -1;
    if (a.entryScore > b.entryScore)
      return 1;
    return 0;
  }

  render() {
    const { entries, teamWinMap } = this.state
    const { makeSentenceCase } = this
    const entriesAndScore = entries.reduce((memoOne, entry) => {
      const { selections, teamName } = entry
      const entryScore = selections.reduce((memoTwo, team) => memoTwo += teamWinMap[team], 0)
      memoOne.push({ teamName, entryScore })
      return memoOne
    }, [])
    entriesAndScore.sort(this.onSortEntries)
    console.log(entriesAndScore)
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    return (
      <div>
        <h4>Sort by: <span>Team Name</span> | <span>Score</span></h4>
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

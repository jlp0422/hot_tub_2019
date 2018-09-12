import React from 'react';
import axios from 'axios';
import Entry from './Entry';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: [],
      teamWinMap: {},
      isNameSorted: true
    }
    this.makeSentenceCase = this.makeSentenceCase.bind(this)
    this.onChangeSortOrder = this.onChangeSortOrder.bind(this)
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

  onChangeSortOrder() {
    this.setState({ isNameSorted: !this.state.isNameSorted})
  }

  onSortEntries(a, b) {
    if (a.entryScore > b.entryScore)
      return -1;
    if (a.entryScore < b.entryScore)
      return 1;
    return 0;
  }

  render() {
    const { entries, teamWinMap, isNameSorted } = this.state
    const { makeSentenceCase, onChangeSortOrder } = this
    const entriesAndScore = entries.reduce((memoOne, entry) => {
      const { selections, teamName } = entry
      const entryScore = selections.reduce((memoTwo, team) => memoTwo += teamWinMap[team], 0)
      memoOne.push({ teamName, entryScore })
      return memoOne
    }, [])
    entriesAndScore.sort(this.onSortEntries)
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    return (
      <div>
        <h4>Sort by:&nbsp;
          <button disabled={isNameSorted} onClick={ onChangeSortOrder }>Team Name</button>&nbsp;&nbsp;
          <button disabled={!isNameSorted} onClick={ onChangeSortOrder} >Score</button></h4>
        <div style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
          <div>
            <h2>Team Name</h2>
          </div>
          <div>
            <h2>Score</h2>
          </div>
        </div>
        { isNameSorted ? (entries.map(entry => (
            <Entry
              key={ entry.id }
              makeSentenceCase={ makeSentenceCase}
              entry={ entry }
              teamWinMap={ teamWinMap }/>
        ))) : (entriesAndScore.map(entry => (
            <Entry
              key={entry.id}
              makeSentenceCase={makeSentenceCase}
              entry={entry}
              teamWinMap={teamWinMap}
              scoreSorted={true} />
          ))

        )}
      </div>
    )
  }
}

export default Standings;

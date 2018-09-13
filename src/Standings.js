import React from 'react';
import axios from 'axios';
import Entry from './Entry';
import { makeSentenceCase } from './utils';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = { isNameSorted: true }
    this.onChangeSortOrder = this.onChangeSortOrder.bind(this)
  }

  componentDidMount() {
    const { entries, teamWinMap } = this.props
    this.setState({ entries, teamWinMap })
  }

  onChangeSortOrder() {
    this.setState({ isNameSorted: !this.state.isNameSorted})
  }

  onSortEntries(a, b) {
    if (a.entryScore > b.entryScore) return -1;
    if (a.entryScore < b.entryScore) return 1;
    return 0;
  }

  render() {
    const { entries, teamWinMap } = this.props
    const {isNameSorted } = this.state
    const { onChangeSortOrder } = this
    const entriesAndScore = entries.reduce((memoOne, entry) => {
      const { selections, teamName, id } = entry
      const entryScore = selections.reduce((memoTwo, team) => memoTwo += teamWinMap[team], 0)
      memoOne.push({ id,teamName, entryScore })
      return memoOne
    }, [])
    entriesAndScore.sort(this.onSortEntries)
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    return (
      <div>
        <h4>Sort by:&nbsp;
          <button disabled={isNameSorted} onClick={ onChangeSortOrder }>Team Name</button>&nbsp;&nbsp;
          <button disabled={!isNameSorted} onClick={ onChangeSortOrder} >Score</button></h4>
        <div style={{ display: 'grid', gridTemplateColumns: '75% 20%' }}>
          <div>
            <h2>Team Name</h2>
          </div>
          <div>
            <h2>Score</h2>
          </div>
        </div>
        { isNameSorted ? (
            entries.map((entry, idx) => (
              <Entry
                key={ entry.id }
                makeSentenceCase={ makeSentenceCase}
                entry={ entry }
                teamWinMap={ teamWinMap }
                rank={ idx }
              />
            ))
          ) : (
            entriesAndScore.map((entry, idx) => (
              <Entry
                key={ entry.teamName }
                makeSentenceCase={ makeSentenceCase }
                entry={ entry }
                teamWinMap={ teamWinMap }
                scoreSorted={ true }
                rank={ idx } />
            ))
          )
        }
      </div>
    )
  }
}

export default Standings;

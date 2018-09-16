import React from 'react';
import Entry from './Entry';
import { makeSentenceCase, sortEntries } from './utils';

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
    entriesAndScore.sort(sortEntries)
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    return (
      <div>
        <h2>Hot Tub Standings</h2>
        <h4>Sort by:&nbsp;
          <button disabled={isNameSorted} onClick={ onChangeSortOrder }>Team Name</button>&nbsp;&nbsp;
          <button disabled={!isNameSorted} onClick={ onChangeSortOrder} >Score</button></h4>
        <div style={{ display: 'grid', gridTemplateColumns: '75% 20%' }}>
          <div>
            <h3>Team Name</h3>
          </div>
          <div>
            <h3>Score</h3>
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

import React from 'react';
import Entry from './Entry';
import { makeSentenceCase, sortByScore } from './utils';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = {
      isNameSorted: false,
      compareTeams: []
    }
    this.onChangeSortOrder = this.onChangeSortOrder.bind(this)
    this.onSelectToCompare = this.onSelectToCompare.bind(this)
  }

  componentDidMount() {
    const { entries, teamWinMap } = this.props
    this.setState({ entries, teamWinMap })
  }

  onChangeSortOrder() {
    this.setState({ isNameSorted: !this.state.isNameSorted })
  }

  onSelectToCompare(teamID) {
    const { compareTeams } = this.state
    const index = compareTeams.indexOf(teamID)
    let newTeams;
    if (index > -1) {
      const first = compareTeams.slice(0, index)
      newTeams = first.concat(compareTeams.slice(index + 1))
    }
    else newTeams = compareTeams.concat(teamID)
    this.setState({ compareTeams: newTeams })
  }

  render() {
    const { entries, teamWinMap } = this.props
    const { isNameSorted, compareTeams } = this.state
    const { onChangeSortOrder, onSelectToCompare } = this
    const entriesAndScore = entries.reduce((memoOne, entry) => {
      const { selections, teamName, id } = entry
      const entryScore = selections.reduce((memoTwo, team) => memoTwo += teamWinMap[team], 0)
      memoOne.push({ id, teamName, entryScore })
      return memoOne
    }, [])
    entriesAndScore.sort(sortByScore)
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    console.log('state: ', compareTeams)
    return (
      <div>
        <h2>Hot Tub Standings</h2>
        <h4>Sort by&nbsp;&nbsp;
          <button style={{ fontSize: '14px' }} className="btn btn-warning" disabled={isNameSorted} onClick={onChangeSortOrder}>
            Team Name
          </button>&nbsp;&nbsp;
          <button style={{ fontSize: '14px' }} className="btn btn-warning" disabled={!isNameSorted} onClick={onChangeSortOrder}>
            Score
          </button>&nbsp;&nbsp;
          <button style={{ fontSize: '14px' }} className="btn btn-success" disabled={compareTeams.length < 2} >
            Compare
          </button>
          </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '5% 70% 20%' }}>
          <div style={{ gridColumnStart: 2 }}>
            <h3>Team Name</h3>
          </div>
          <div style={{ gridColumnStart: 3 }}>
            <h3>Score</h3>
          </div>
        </div>
        {isNameSorted ? (
          entries.map((entry, idx) => (
            <Entry
              key={entry.id}
              makeSentenceCase={makeSentenceCase}
              entry={entry}
              teamWinMap={teamWinMap}
              rank={idx}
              page={'seasonStandings'}
              select={onSelectToCompare}
              compareTeams={ compareTeams }
            />
          ))
        ) : (
            entriesAndScore.map((entry, idx) => (
              <Entry
                key={entry.teamName}
                makeSentenceCase={makeSentenceCase}
                entry={entry}
                teamWinMap={teamWinMap}
                scoreSorted={true}
                rank={idx}
                page={'seasonStandings'}
                select={onSelectToCompare}
                compareTeams={ compareTeams }
              />
            ))
          )
        }
      </div>
    )
  }
}

export default Standings;

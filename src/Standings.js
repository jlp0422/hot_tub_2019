import React from 'react';
import Entry from './Entry';
import CompareModal from './CompareModal'
import { makeSentenceCase, sortByScore } from './utils';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = {
      isNameSorted: false,
      compareTeams: [],
      isModalOpen: false
    }
    this.onChangeSortOrder = this.onChangeSortOrder.bind(this)
    this.onSelectToCompare = this.onSelectToCompare.bind(this)
    this.onOpenCloseModal = this.onOpenCloseModal.bind(this)
    this.onClearCompare = this.onClearCompare.bind(this)
  }

  componentDidMount() {
    const { entries, teamWinMap } = this.props
    this.setState({ entries, teamWinMap })
  }

  onChangeSortOrder() {
    this.setState({ isNameSorted: !this.state.isNameSorted })
  }

  onOpenCloseModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen })
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

  onClearCompare() {
    this.setState({ compareTeams: [] })
  }

  render() {
    const { entries, teamWinMap, teamCityName } = this.props
    const { isNameSorted, compareTeams, isModalOpen } = this.state
    const { onChangeSortOrder, onSelectToCompare, onOpenCloseModal } = this
    const entriesAndScore = entries.reduce((memoOne, entry) => {
      const { selections, teamName, id } = entry
      const entryScore = selections.reduce((memoTwo, team) => memoTwo += teamWinMap[team], 0)
      memoOne.push({ id, teamName, entryScore })
      return memoOne
    }, [])
    entriesAndScore.sort(sortByScore)
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    return (
      <div>
      { isModalOpen ? (
          <CompareModal
            showModal={isModalOpen}
            closeModal={onOpenCloseModal}
            compareTeams={ compareTeams }
            entries={ entries }
            teamCityName={ teamCityName }
            teamWinMap={ teamWinMap }
            entriesAndScore={ entriesAndScore}
          />
        ) : null
      }
        <h2>Hot Tub Standings</h2>
        <h4>Sort by&nbsp;&nbsp;
          <button className="btn btn-warning font-14" disabled={isNameSorted} onClick={onChangeSortOrder}>
            Team Name
          </button>&nbsp;&nbsp;
          <button className="btn btn-warning font-14" disabled={!isNameSorted} onClick={onChangeSortOrder}>
            Score
          </button>&nbsp;&nbsp;
          <button className="btn btn-success font-14" disabled={compareTeams.length < 2 || compareTeams.length > 3} onClick={onOpenCloseModal}>
            Compare (Max 3)
          </button>&nbsp;&nbsp;
          <button className="btn btn-danger font-14" disabled={!compareTeams.length} onClick={this.onClearCompare}>
            Clear Comparison
          </button>
          </h4>
        <div className="grid grid-75-20">
          <div>
            <h3>Team Name</h3>
          </div>
          <div>
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

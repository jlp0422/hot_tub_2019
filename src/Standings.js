import React from 'react';
import Entry from './Entry';
import ReactGA from 'react-ga';
import CompareModealHOC from './reusable/CompareModalHOC';
import TableHeader from './reusable/TableHeader';
import ButtonGroup from './reusable/ButtonGroup';
import TableKey from './reusable/TableKey'
import { makeSentenceCase, sortByScore, entriesWithScore, sortByName } from './utils';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = {
      isNameSorted: false,
      compareTeams: [],
      isModalOpen: false,
      isKeyOpen: false
    }
    this.onChangeSortOrder = this.onChangeSortOrder.bind(this)
    this.onSelectToCompare = this.onSelectToCompare.bind(this)
    this.onOpenCloseModal = this.onOpenCloseModal.bind(this)
    this.onClearCompare = this.onClearCompare.bind(this)
    this.onShowKey = this.onShowKey.bind(this)
  }

  componentDidMount() {
    ReactGA.pageview('/standings/hot-tub');
    const { entries, teamWinMap } = this.props
    this.setState({ entries, teamWinMap })
  }

  onChangeSortOrder(type) {
    this.setState(prevState => ({ isNameSorted: !prevState.isNameSorted }))
    ReactGA.event({
      category: 'Change sort',
      action: type
    })
  }

  onOpenCloseModal() {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
  }

  onShowKey() {
    this.setState(prevState => ({ isKeyOpen: !prevState.isKeyOpen }))
    ReactGA.event({
      category: 'Toggle key',
      action: !prevState.isKeyOpen
    })
  }

  onSelectToCompare(teamID) {
    const { compareTeams } = this.state
    const index = compareTeams.indexOf(teamID)
    let newTeams;
    if (index > -1) {
      const first = compareTeams.slice(0, index)
      newTeams = first.concat(compareTeams.slice(index + 1))
    }
    else {
      newTeams = compareTeams.concat(teamID)
    }
    this.setState({ compareTeams: newTeams })
  }

  onClearCompare() {
    this.setState({ compareTeams: [] })
  }

  render() {
    const { entries, teamWinMap, teamCityName, divisionLeaders, width } = this.props;
    const { isNameSorted, compareTeams, isModalOpen, isKeyOpen } = this.state
    const { onChangeSortOrder, onSelectToCompare, onOpenCloseModal, onClearCompare, onShowKey } = this;
    const entriesAndScore = entriesWithScore(entries, teamWinMap, divisionLeaders)
    if (!entries.length || !Object.keys(teamWinMap).length) return <h2>Loading...</h2>;
    return (
      <div>
      { isModalOpen &&
          <CompareModealHOC
            showModal={isModalOpen}
            closeModal={onOpenCloseModal}
            compareTeams={ compareTeams }
            entries={ entries }
            teamCityName={ teamCityName }
            teamWinMap={ teamWinMap }
            entriesAndScore={ entriesAndScore}
            width={ width }
            divisionLeaders={ divisionLeaders }
          />
      }
        <h2>Hot Tub Standings</h2>
        <ButtonGroup
          buttonAction={'Sort by'}
          isSort={true}
          copyLeft={'Team Name'}
          disabledLeft={isNameSorted}
          sortLeft={() => onChangeSortOrder('team')}
          copyRight={'Reg. Season Wins'}
          disabledRight={!isNameSorted}
          sortRight={() => onChangeSortOrder('score')}
        />
        <ButtonGroup
          buttonAction={'Compare Teams'}
          isSort={false}
          copyLeft={'Compare (Max 3)'}
          disabledLeft={compareTeams.length < 2 || compareTeams.length > 3}
          sortLeft={onOpenCloseModal}
          copyRight={'Clear'}
          disabledRight={!compareTeams.length}
          sortRight={onClearCompare}
        />
        { width < 511 && <TableKey isKeyOpen={ isKeyOpen } toggleKey={ onShowKey } /> }
        <TableHeader overallStandings width={ width } />
          {
            entriesAndScore.sort(isNameSorted ? sortByName : sortByScore).map((entry, idx) => (
              <Entry
                key={entry.id}
                makeSentenceCase={makeSentenceCase}
                entry={entry}
                rank={idx}
                page={'seasonStandings'}
                select={onSelectToCompare}
                compareTeams={compareTeams}
              />
            ))
          }
      </div>
    )
  }
}

export default Standings;

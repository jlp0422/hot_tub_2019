import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { makeSentenceCase, allGamesToWeeksObject, totalWinsForWeek } from './utils';

class TeamEntry extends React.Component {
  constructor() {
    super()
    this.state = {
      winsPerWeekObject: {},
    }
    this.onSetState = this.onSetState.bind(this)
  }

  onSetState(obj) {
    this.setState({ winsPerWeekObject: obj })
  }

  componentWillUnmount() {
    this.setState({ winsPerWeekObject: {} })
  }

  render() {
    const { winsPerWeekObject, error } = this.state
    return (
      <_TeamEntry {...this.props} winsPerWeekObject={winsPerWeekObject} changeState={ this.onSetState } />
    )
  }
}

const _TeamEntry = ({
  id,
  entries,
  teamWinMap,
  teamCityName,
  history,
  changeState,
  winsPerWeekObject,
}) => {
  let tab = history.location.hash.slice(1)
  const entry = entries.find(entry => entry.id === id * 1)
  const totalScore = entry.selections.reduce((memo, team) => memo += teamWinMap[team], 0)
  const apiTeams = entry.selections.join(',')
  if (!Object.keys(winsPerWeekObject).length) {
    axios.get(`/api/games/seasonal/regular/2018/${apiTeams}`)
      .then(resp => resp.data[0].games)
      .then(allGames => allGamesToWeeksObject(allGames))
      .then(gamesPerWeek => totalWinsForWeek(gamesPerWeek, entry.selections))
      .then(weeklyWins => changeState(weeklyWins))
      .catch(err => {
        throw Error('Network error.')
      })
  }
  if (!tab) tab = 'teams'
  if (!entry.id) return null;
  return (
    <div>
      <h2>Team Name: {makeSentenceCase(entry.teamName)}</h2>
      <h3>Total wins: {totalScore}</h3>
      <ul className="nav nav-tabs nav-fill margin-b-15">
        <li className="nav-item">
          <span onClick={() => history.push(`/entry/${id}#teams`)} className={`nav-link ${tab === 'teams' && 'active font-weight-bold'}`}>
            Teams
          </span>
        </li>
        <li className="nav-item">
          <span onClick={() => history.push(`/entry/${id}#wins`)} className={`nav-link ${tab === 'wins' && 'active font-weight-bold'}`}>
            Weekly Wins
          </span>
        </li>
      </ul>
      { tab === 'week' && !Object.keys(winsPerWeekObject).length && <div>Network error. Please refresh.</div> }
      {
        tab === 'teams' ? (
          <ul className="list-group">
            {entry.selections.map(team => (
              <li className="list-group-item" key={team}>
                <Link to={`/teams/${team}`}>
                  {teamCityName[team]}
                </Link>
                &nbsp;&nbsp;<span className="badge badge-secondary badge-pill">{`${teamWinMap[team]} ${teamWinMap[team] === 1 ? 'win' : 'wins'}`}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            {
              Object.keys(winsPerWeekObject).map(weekName => {
                const weekNumber = Number(weekName.split(' ')[1])
                return (
                  <div key={weekName} className="grid entry-padding" style={{ gridTemplateColumns: '45% 45%', gridColumnGap: '5%', backgroundColor: `${weekNumber % 2 ? '#eee' : '#d8d8d8'}` }}>
                    <Link to={`/standings/weekly?week=${weekNumber}`}>
                      <h4>{weekName}</h4>
                    </Link>
                    <h4>{winsPerWeekObject[weekName]}{' '}wins</h4>
                  </div>
                )
              })
            }
          </div>
        )
      }

    </div>
  )
}

export default TeamEntry;

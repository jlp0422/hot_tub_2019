import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Entry from './Entry';
import Loading from './Loading';
import { makeSentenceCase, sortByScore, sortByName } from './utils';

class WeeklyStandings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isNameSorted: false,
      activeWeek: Number(this.props.history.location.search.split('=')[1]) || 1,
      winsPerEntry: []
    }
    this.onChangeSortOrder = this.onChangeSortOrder.bind(this)
  }

  componentDidMount() {
    this.makeGamesCall(this.state.activeWeek)
  }

  makeGamesCall(gamesWeek) {
    this.setState({ winsPerEntry: [] })
    axios.get(`/api/games/weekly/regular/2018/${gamesWeek}`)
      .then(resp => resp.data)
      .then(schedule => schedule[0].games)
      .then(games => {
        const weeklyWinners = games.reduce((memo, game) => {
          if (game.score.awayScoreTotal > game.score.homeScoreTotal) {
            memo.push(game.schedule.awayTeam.abbreviation)
          }
          else if (game.score.awayScoreTotal < game.score.homeScoreTotal) {
            memo.push(game.schedule.homeTeam.abbreviation)
          }
          return memo
        }, [])
        const winsPerEntry = this.props.entries.reduce((memo, entry) => {
          const totalWins = entry.selections.reduce((winMemo, team) => {
            if (weeklyWinners.includes(team)) winMemo++
            return winMemo
          }, 0)
          memo.push({ id: entry.id, teamName: entry.teamName, entryScore: totalWins})
          return memo
        }, [])
        this.setState({ winsPerEntry })
      })
      .catch(err => console.error(err))
  }

  onSelectWeek(week) {
    this.setState({ activeWeek: week })
    this.props.history.push(`/standings/weekly?week=${week}`)
    this.makeGamesCall(week)
  }

  onChangeSortOrder() {
    this.setState({ isNameSorted: !this.state.isNameSorted })
  }

  render() {
    const { isNameSorted, activeWeek, winsPerEntry } = this.state
    const { onChangeSortOrder } = this
    return (
      <div>
        <h2>Week {activeWeek} Standings</h2>
        <h4>Sort by:&nbsp;
        <button disabled={isNameSorted} onClick={ onChangeSortOrder }>Team Name</button>&nbsp;&nbsp;
        <button disabled={!isNameSorted} onClick={ onChangeSortOrder }>Score</button></h4>
        <ul className="nav nav-tabs" style={{ marginBottom: '15px' }}>
          <li className="nav-item">
            <span onClick={() => this.onSelectWeek(1)} className={`nav-link ${activeWeek === 1 && 'active'}`}>
              Week 1
            </span>
          </li>
          <li className="nav-item">
            <span onClick={() => this.onSelectWeek(2)} className={`nav-link ${activeWeek === 2 && 'active'}`}>
              Week 2
            </span>
          </li>
        </ul>
        {
          !winsPerEntry.length ? (<h2>Loading...</h2>) : (
            <div>
        <div style={{ display: 'grid', gridTemplateColumns: '75% 20%' }}>
          <div>
            <h3>Team Name</h3>
          </div>
          <div>
            <h3>Score</h3>
          </div>
        </div>
        {isNameSorted ? (
          winsPerEntry.sort(sortByName).map((entry, idx) => (
            <Entry
              key={entry.teamName}
              makeSentenceCase={makeSentenceCase}
              entry={entry}
              rank={idx}
              page={'weeklyStandings'}
            />
          ))
        ) : (
            winsPerEntry.sort(sortByScore).map((entry, idx) => (
              <Entry
                key={entry.teamName}
                makeSentenceCase={makeSentenceCase}
                entry={entry}
                scoreSorted={true}
                rank={idx}
                page={'weeklyStandings'}
              />
            ))
          )
        }
      </div>

      )
    }
    </div>
    )
  }
}

export default WeeklyStandings;

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
      winsPerEntry: [],
      error: ''
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
          memo.push({ id: entry.id, teamName: entry.teamName, entryScore: totalWins })
          return memo
        }, [])
        this.setState({ winsPerEntry })
      })
      .catch(error => this.setState({ error }))
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
    const { isNameSorted, activeWeek, winsPerEntry, error } = this.state
    const { onChangeSortOrder } = this
    const weeks = [
      { number: 1, text: 'Week 1' },
      { number: 2, text: 'Week 2' },
      { number: 3, text: 'Week 3' },
      { number: 4, text: 'Week 4' },
      // { number: 5, text: 'Week 5' },
      // { number: 6, text: 'Week 6' },
      // { number: 7, text: 'Week 7' },
      // { number: 8, text: 'Week 8' },
      // { number: 9, text: 'Week 9' },
      // { number: 10, text: 'Week 10' },
    ]
    return (
      <div>
        <h2>Week {activeWeek} Standings</h2>
        <h4>Sort by&nbsp;&nbsp;
        <button style={{ fontSize: '14px' }} className="btn btn-warning" disabled={isNameSorted} onClick={onChangeSortOrder}>Team Name</button>&nbsp;&nbsp;
        <button style={{ fontSize: '14px' }} className="btn btn-warning" disabled={!isNameSorted} onClick={onChangeSortOrder}>Score</button></h4>
        <ul className="nav nav-tabs" style={{ marginBottom: '15px' }}>
          {
            weeks.map(week => (
              <li key={week.number} className="nav-item">
                <span onClick={() => this.onSelectWeek(week.number)} className={`nav-link ${activeWeek === week.number && 'active'}`}>
                  {week.text}
                </span>
              </li>
            ))
          }
        </ul>
        {error ? <h4>Network error. Please refresh.</h4> : (
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
        )}
      </div>
    )
  }
}

export default WeeklyStandings;

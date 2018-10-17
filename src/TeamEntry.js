import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { makeSentenceCase } from './utils';

const TeamEntry = ({ id, entries, teamWinMap, teamCityName, history }) => {
  const tab = history.location.hash.slice(1)
  const entry = entries.find(entry => entry.id === id * 1)
  const totalScore = entry.selections.reduce((memo, team) => memo += teamWinMap[team], 0)
  const apiTeams = entry.selections.join(',')
  axios.get(`/api/games/seasonal/regular/2018/${apiTeams}`)
    .then(resp => console.log(resp.data))
  // console.log(response)
  if (!tab) history.push(`/entry/${id}#teams`)
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
          null
        )
      }

    </div>
  )
}

export default TeamEntry;

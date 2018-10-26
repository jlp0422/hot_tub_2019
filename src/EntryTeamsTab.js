import React from 'react'
import { Link } from 'react-router-dom'

const EntryTeamsTab = ({ entry, teamCityName, teamWinMap }) => {
  return (
    <ul className="list-group">
      {entry.selections.sort().map(team => (
        <li className="list-group-item" key={team}>
          <Link className="link" to={`/teams/${team}`}>
            {teamCityName[team]}
          </Link>
          &nbsp;&nbsp;<span className="badge badge-secondary badge-pill">{`${teamWinMap[team]} ${teamWinMap[team] === 1 ? 'win' : 'wins'}`}</span>
        </li>
      ))}
    </ul>
  )
}

export default EntryTeamsTab;
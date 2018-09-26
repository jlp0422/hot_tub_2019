import React from 'react';
import { Link } from 'react-router-dom';
import { makeSentenceCase } from './utils';

const TeamEntry = ({ id, entries, teamWinMap, teamCityName }) => {
  const entry = entries.find(entry => entry.id === id * 1)
  const totalScore = entry.selections.reduce((memo, team) => memo += teamWinMap[team], 0)
  if (!entry.id) return null;
  return (
    <div>
      <h2>Team Name: {makeSentenceCase(entry.teamName)}</h2>
      <h3>Total wins: {totalScore}</h3>
      <h3>Teams:</h3>
      <ul>
        {entry.selections.map(team => (
          <li key={team}>
            <Link to={`/teams/${team}`}>
              {teamCityName[team]}
            </Link>
            &nbsp;({`${teamWinMap[team]} ${teamWinMap[team] === 1 ? 'win' : 'wins'}`})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TeamEntry;

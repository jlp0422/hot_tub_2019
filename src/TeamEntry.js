import React from 'react';
import axios from 'axios';
import { makeSentenceCase } from './utils';

const TeamEntry = ({ id, entries, teamWinMap, teamCityName }) => {
  const entry = entries.find(entry => entry.id === id * 1)
  const totalScore = entry.selections.reduce((memo, team) => memo += teamWinMap[team], 0)
  if (!entry.id) return null;
  return (
    <div>
      <h1>Team Name: {makeSentenceCase(entry.teamName)}</h1>
      <h3>Total wins: { totalScore }</h3>
      <h3>Teams:</h3>
      <ul>
        { entry.selections.map(team => (
          <li key={team}>{teamCityName[team]} (
            {`${teamWinMap[team]} ${teamWinMap[team] === 1 ? 'win' : 'wins'}`}
          )</li>
        ))}
      </ul>
    </div>
  )
}

export default TeamEntry;

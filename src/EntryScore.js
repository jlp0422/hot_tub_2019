import React from 'react';
import axios from 'axios';

const EntryScore = ({ entry, teamWinMap }) => {
  let totalWins = 0
  const teams = entry.selections
  const totalScore = teams.map(team => totalWins += teamWinMap[team])
  return (
    <div>
        <h3>
          {totalWins}
        </h3>
    </div>
    )
}

export default EntryScore

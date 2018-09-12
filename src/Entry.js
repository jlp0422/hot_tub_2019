import React from 'react';
import axios from 'axios';

const Entry = ({ entry, teamWinMap, makeSentenceCase }) => {
  const teams = entry.selections
  const entryScore = teams.reduce((memo, team) => memo += teamWinMap[team], 0)
  return (
    <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
      <div>
        <h3>{makeSentenceCase(entry.teamName)}</h3>
      </div>
      <div>
        <h3>{entryScore}</h3>
      </div>
    </div>
    )
}

export default Entry

import React from 'react';
import { Link } from 'react-router-dom';

const Entry = ({ entry, teamWinMap, makeSentenceCase, scoreSorted, rank }) => {
  const teams = scoreSorted ? null : entry.selections
  const entryScore = scoreSorted ? null : teams.reduce((memo, team) => memo += teamWinMap[team], 0)
  return (
    <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '75% 20%', backgroundColor: `${rank % 2 ? '#d8d8d8' : '#eee' }` }}>
      <div>
        <Link to={`/entry/${entry.id}`}>
          <h4>{/* scoreSorted ? `${rank+1})` : null */} {makeSentenceCase(entry.teamName)}</h4>
        </Link>
      </div>
      <div>
        <h4>{scoreSorted ? entry.entryScore : entryScore}</h4>
      </div>
    </div>
    )
}

export default Entry

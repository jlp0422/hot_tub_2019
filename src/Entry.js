import React from 'react';
import { Link } from 'react-router-dom';

const Entry = ({ entry, teamWinMap, makeSentenceCase, scoreSorted, rank }) => {
  const teams = scoreSorted ? null : entry.selections
  const entryScore = scoreSorted ? null : teams.reduce((memo, team) => memo += teamWinMap[team], 0)
  return (
    <div key={ entry.id } style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
      <div>
        <Link to={`/entry/${entry.id}`}>
          <h3>{ scoreSorted ? `${rank+1})` : null } {makeSentenceCase(entry.teamName)}</h3>
        </Link>
      </div>
      <div>
        <h3>{scoreSorted ? entry.entryScore : entryScore}</h3>
      </div>
    </div>
    )
}

export default Entry

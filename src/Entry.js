import React from 'react';
import { Link } from 'react-router-dom';

const Entry = ({
  entry,
  teamWinMap,
  makeSentenceCase,
  scoreSorted,
  rank,
  page,
  select,
  compareTeams,
}) => {
  const teams = page === 'seasonStandings' && !scoreSorted && entry.selections
  const entryScore = page === 'seasonStandings' && !scoreSorted && teams.reduce((memo, team) => memo += teamWinMap[team], 0)
  const gridColumns = page === 'seasonStandings' ? 'grid-5-70-20' : 'grid-75-20'
  return (
    <div key={entry.id} className={`grid entry-padding ${gridColumns}`} style={{ backgroundColor: `${rank % 2 ? '#d8d8d8' : '#eee'}` }}>
      {
        page === 'seasonStandings' && (
          <div className="form-check">
            <input checked={compareTeams.includes(entry.id)} onChange={() => select(entry.id)} className="form-check-input" type="checkbox" />
          </div>
        )
      }
      <div>
        <Link className="link" to={`/entry/${entry.id}`}>
          <h4 style={{ fontWeight: 600 }}>{/* scoreSorted ? `${rank+1})` : null */} {makeSentenceCase(entry.teamName)}</h4>
        </Link>
      </div>
      <div>
        <h4>{page === 'seasonStandings' && !scoreSorted ? entryScore : entry.entryScore}</h4>
      </div>
    </div>
  )
}

export default Entry;

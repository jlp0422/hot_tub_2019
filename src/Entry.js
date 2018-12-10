import React from 'react';
import { Link } from 'react-router-dom';

const Entry = ({
  entry,
  makeSentenceCase,
  rank,
  page,
  select,
  compareTeams,
}) => {
  const isSeason = page === "seasonStandings"
  const gridColumns = isSeason ? "grid-3-40-15-20-20" : "grid-75-20";
  return (
    <div key={entry.id} className={`grid entry-padding ${gridColumns}`} style={{ backgroundColor: `${rank % 2 ? '#d8d8d8' : '#eee'}` }}>
      { isSeason && (
          <div className="form-check">
            <input checked={compareTeams.includes(entry.id)} onChange={() => select(entry.id)} className="form-check-input" type="checkbox" />
          </div>
      )}
      <Link className="link" to={`/entry/${entry.id}`}>
        <h4 style={{ fontWeight: 600 }}>{/* scoreSorted ? `${rank+1})` : null */} {makeSentenceCase(entry.teamName)}</h4>
      </Link>
      <h4>{entry.entryScore}</h4>
      { isSeason && (
        <React.Fragment>
          <h4>{entry.divisonScore}</h4>
          <h4>{entry.entryScore + entry.divisonScore}</h4>
        </React.Fragment>
      )}
    </div>
  )
}

export default Entry;

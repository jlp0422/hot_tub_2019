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
  const gridColumns = isSeason ? "grid-overall" : "grid-75-20";
  return (
    <div key={entry.id} className={`grid entry-padding ${gridColumns}`} style={{ backgroundColor: `${rank % 2 ? '#d8d8d8' : '#eee'}` }}>
      { isSeason && (
          <div className="form-check">
            <input checked={compareTeams.includes(entry.id)} onChange={() => select(entry.id)} className="form-check-input" type="checkbox" />
          </div>
      )}
      <Link className="link" to={`/entry/${entry.id}`}>
        <h4 className="font-weight-bold">{/* scoreSorted ? `${rank+1})` : null */} {makeSentenceCase(entry.teamName)}</h4>
      </Link>
      <h4 className="table-text">{entry.entryScore}</h4>
      { isSeason && (
        <React.Fragment>
          <h4 className="table-text">{entry.divisonScore}</h4>
          <h4 className="table-text">0</h4>
          <h4 className="table-text">{entry.entryScore + entry.divisonScore}</h4>
        </React.Fragment>
      )}
    </div>
  )
}

export default Entry;

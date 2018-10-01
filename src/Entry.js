import React from 'react';
import { Link } from 'react-router-dom';

const Entry = ({ entry, teamWinMap, makeSentenceCase, scoreSorted, rank, page, select, compareTeams }) => {
  const teams = page === 'seasonStandings' && !scoreSorted && entry.selections
  const entryScore = page === 'seasonStandings' && !scoreSorted && teams.reduce((memo, team) => memo += teamWinMap[team], 0)
  const gridColumns = page === 'seasonStandings' ? '5% 70% 20%' : '75% 20%'
  return (
    <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: gridColumns, backgroundColor: `${rank % 2 ? '#d8d8d8' : '#eee'}`, padding: '5px 5px 0px 10px' }}>
      { page === 'seasonStandings' ? (
        <div className="form-check">
          <input checked={compareTeams.includes(entry.id)} onChange={() => select(entry.id) } className="form-check-input" type="checkbox" />
        </div>) : null
      }
      <div style={{  }}>
        <Link to={`/entry/${entry.id}`}>
          <h4>{/* scoreSorted ? `${rank+1})` : null */} {makeSentenceCase(entry.teamName)}</h4>
        </Link>
      </div>
      <div style={{  }}>
        <h4>{page === 'seasonStandings' && !scoreSorted ? entryScore : entry.entryScore}</h4>
      </div>
    </div>
  )
}

export default Entry

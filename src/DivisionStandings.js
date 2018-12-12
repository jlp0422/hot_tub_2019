import React from 'react';
import { Link } from 'react-router-dom';
import { sortDivision } from './utils';

const DivisionStandings = ({ division, teamCityName, width }) => {
  division.sort(sortDivision)
  if (!division.length) return null;
  return (
    <div>
      <div className="grid division-grid">
        <p className={`division-font font-weight-bold ${width < 371 && 'table-text'}`}>Place</p>
        <p className={`division-font font-weight-bold ${width < 371 && 'table-text'}`}>Team</p>
        <p className="division-font font-weight-bold table-text">Wins</p>
        <p className="division-font font-weight-bold table-text">{ width < 371 ? 'GB' : 'Games Back'}</p>
      </div>
      {
        division.map(team => (
          <div key={team.teamAbbrev} className="grid division-grid">
            <p className={`division-font ${width < 371 && 'table-text'}`}>{team.rank}</p>
            <p className={`division-font ${width < 371 && 'table-text'}`}>
              <Link className="link" to={`/teams/${team.teamAbbrev}`}>
                {width < 371 ? team.teamAbbrev : teamCityName[team.teamAbbrev]}
              </Link>
            </p>
            <p className="division-font table-text">{team.wins}</p>
            <p className="division-font table-text">{team.gamesBack}</p>
          </div>
        ))
      }
      <hr />
    </div>
  )
}

export default DivisionStandings;

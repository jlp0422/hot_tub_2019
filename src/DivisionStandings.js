import React from 'react';
import { Link } from 'react-router-dom';
import { sortDivision } from './utils';

const DivisionStandings = ({ division, teamCityName }) => {
  division.sort(sortDivision)
  if (!division.length) return null;
  return (
    <div>
      <div className="grid division-grid">
        <p className="division-font font-weight-bold">Place</p>
        <p className="division-font font-weight-bold">Team</p>
        <p className="division-font font-weight-bold">Wins</p>
        <p className="division-font font-weight-bold">Games Back</p>
      </div>
      {
        division.map(team => (
          <div key={team.teamAbbrev} className="grid division-grid">
            <p className="division-font">{team.rank}</p>
            <p className="division-font"><Link to={`/teams/${team.teamAbbrev}`}>{teamCityName[team.teamAbbrev]}</Link></p>
            <p className="division-font">{team.wins}</p>
            <p className="division-font">{team.gamesBack}</p>
          </div>
        ))
      }
      <hr />
    </div>
  )
}

export default DivisionStandings;

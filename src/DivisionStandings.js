import React from 'react';
import { Link } from 'react-router-dom';
import { sortDivision } from './utils';

const DivisionStandings = ({ division, teamCityName }) => {
  division.sort(sortDivision)
  if (!division.length) return null;
  return (
    <div>
      <div className="grid division-grid">
        <p className="font-weight-bold">Place</p>
        <p className="font-weight-bold">Team</p>
        <p className="font-weight-bold">Wins</p>
        <p className="font-weight-bold">Games Back</p>
      </div>
      {
        division.map(team => (
          <div key={team.teamAbbrev} className="grid division-grid">
            <p>{team.rank}</p>
            <p><Link to={`/teams/${team.teamAbbrev}`}>{teamCityName[team.teamAbbrev]}</Link></p>
            <p>{team.wins}</p>
            <p>{team.gamesBack}</p>
          </div>
        ))
      }
      <hr />
    </div>
  )
}

export default DivisionStandings;

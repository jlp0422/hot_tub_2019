import React from 'react';
import { Link } from 'react-router-dom';
import { sortDivision } from './utils';

const DivisionStandings = ({ division, teamCityName }) => {
  division.sort(sortDivision)
  if (!division.length) return null;
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '10% 40% 20% 20%' }}>
        <p style={{ fontWeight: 'bold' }}>Place</p>
        <p style={{ fontWeight: 'bold' }}>Team</p>
        <p style={{ fontWeight: 'bold' }}>Wins</p>
        <p style={{ fontWeight: 'bold' }}>Games Back</p>
      </div>
      {
        division.map(team => (
          <div key={team.teamAbbrev} style={{ display: 'grid', gridTemplateColumns: '10% 40% 20% 20%' }}>
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

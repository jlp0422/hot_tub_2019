import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
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
        <p className="division-font font-weight-bold">
          <MediaQuery query="(max-width: 370px)">
            GB
          </MediaQuery>
          <MediaQuery query="(min-width: 371px)">
            Games Back
          </MediaQuery>
        </p>
      </div>
      {
        division.map(team => (
          <div key={team.teamAbbrev} className="grid division-grid">
            <p className="division-font">{team.rank}</p>
            <p className="division-font">
              <Link to={`/teams/${team.teamAbbrev}`}>
                <MediaQuery query="(max-width: 370px)">
                  {team.teamAbbrev}
                </MediaQuery>
                <MediaQuery query="(min-width: 371px)">
                  {teamCityName[team.teamAbbrev]}
                </MediaQuery>
              </Link>
            </p>
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

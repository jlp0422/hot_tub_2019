/* NOT BEING USED */

import React from 'react';
import { Link } from 'react-router-dom';

const Teams = ({ teamCityName }) => {
  return (
    <div>
      <h2>NFL Teams</h2>
      <ul>
        {
          Object.keys(teamCityName).map(team => (
            <li key={team}>
              <Link to={`/teams/${team}`}>
                {teamCityName[team]}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Teams;

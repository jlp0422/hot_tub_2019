/* NOT BEING USED */

import React from 'react';
import { Link } from 'react-router-dom';

const Teams = ({ teamCityName }) => {
  return (
    <div>
      <h2>NFL Teams</h2>
      <ul className="list-group">
        {
          Object.keys(teamCityName).map(team => (
            <li className="list-group-item" key={team}>
              <Link className="link" to={`/teams/${team}`}>
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

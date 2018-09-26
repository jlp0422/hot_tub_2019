import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ history }) => {
  const { pathname } = history.location
  const slash = pathname.split('/')[2]
  return (
    <ul className="nav nav-pills" style={{ marginBottom: '15px' }}>
      <li className="nav-item">
        {slash === 'hot-tub' ? (
          <span className="nav-link active">Hot Tub Standings</span>
        ) : (
            <Link className="nav-link" to='/standings/hot-tub'>Hot Tub Standings</Link>
          )
        }
      </li>
      <li className="nav-item">
        {slash === 'nfl' ? (
          <span className="nav-link active">NFL Standings</span>
        ) : (
            <Link className="nav-link" to='/standings/nfl'>NFL Standings</Link>
          )
        }
      </li>
      <li className="nav-item">
        {slash === 'weekly' ? (
          <span className="nav-link active">Wins Per Week</span>
        ) : (
            <Link className="nav-link" to='/standings/weekly'>Wins Per Week</Link>
          )
        }
      </li>
    </ul>
  )
}

export default Nav;

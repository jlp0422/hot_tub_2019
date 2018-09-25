import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ history }) => {
  const { pathname } = history.location
  return (
    <div>
      <h4><Link to='/standings/hot-tub'>Hot Tub Standings</Link></h4>
      <h4><Link to='/standings/nfl'>NFL Standings</Link></h4>
      <h4><Link to='/standings/weekly'>Wins Per Week</Link></h4>
    </div>
  )
}

export default Nav;

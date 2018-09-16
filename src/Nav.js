import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ history }) => {
  const { pathname } = history.location
  return (
    <div>
      <Link to='/standings/hot-tub'><h4>Hot Tub Standings</h4></Link>
      <Link to='/teams'><h4>NFL Teams</h4></Link>
      <Link to='/standings/nfl'><h4>NFL Standings</h4></Link>
    </div>
  )
}

export default Nav;

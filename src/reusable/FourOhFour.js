import React from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

const FourOhFour = () => {
  ReactGA.pageview('/404');
  return <h3>Uh oh. Something went wrong. Head back to <Link className="link" to='/'>safety</Link>.</h3>
}

export default FourOhFour;

import React from 'react';
import { Link } from 'react-router-dom';

const FourOhFour = () => {
  return (
    <h3>Uh oh. Something went wrong. Head back to <Link className="link" to='/'>safety</Link>.</h3>
  )
}

export default FourOhFour;

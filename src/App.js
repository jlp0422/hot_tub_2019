import React from 'react';
import { Switch, HashRouter as Router, Link } from 'react-router-dom';
import Standings from './Standings';

const App = () => {
  return (
    <div className="container">
      <h1>Hot Tub 2018 Standings</h1>
      <Standings />
    </div>
  )
}

export default App;

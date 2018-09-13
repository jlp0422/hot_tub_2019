import React from 'react';
import { Switch, HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Standings from './Standings';

const App = () => {
  return (
    <div className="container">
      <h1>Hot Tub 2018 Standings</h1>
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            <Redirect to='/standings' />
          )} />
          <Route exact path='/standings' component={Standings} />
          {/*<Route exact path='/teams' component={Standings} />*/}
        </Switch>
      </Router>
    </div>
  )
}

export default App;

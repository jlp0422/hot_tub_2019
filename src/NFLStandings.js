import React from 'react';
import ReactGA from 'react-ga';
import DivisionStandings from './DivisionStandings';

const NFLStandings = ({ teamCityName, standings, width }) => {
  ReactGA.pageview('/standings/nfl');
  const divisions = Object.keys(standings).sort()
  return (
    <div>
      <h2>NFL Standings</h2>
      {
        divisions.map(division => (
          <div key={division}>
            <h4>{division}</h4>
            <DivisionStandings width={ width } teamCityName={teamCityName} division={standings[division]} />
          </div>
        ))
      }
    </div>
  )
}

export default NFLStandings;

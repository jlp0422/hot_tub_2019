import React from 'react';
import DivisionStandings from './DivisionStandings';

const NFLStandings = ({ teamCityName, standings }) => {
  const divisions = Object.keys(standings).sort()
  return (
    <div>
      <h2>NFL Standings</h2>
      {
        divisions.map(division => (
          <div key={division}>
            <h4>{division}</h4>
            <DivisionStandings teamCityName={teamCityName} division={standings[division]} />
          </div>
        ))
      }
    </div>
  )
}

export default NFLStandings;

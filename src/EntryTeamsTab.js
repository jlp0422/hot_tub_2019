import React from 'react'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga';
import MediaQuery from 'react-responsive'

const EntryTeamsTab = ({ entry, teamCityName, teamWinMap, divisionLeaders }) => {
  ReactGA.event({
    category: 'change tab',
    action: 'Entry Teams Tab'
  })
  const fourSpaces = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
  return (
    <ul className="list-group">
      {
        entry.selections.sort().map(team => {
          const isDivisionLeader = divisionLeaders.find(leader => leader.teamAbbrev === team)
          return (
            <li className="list-group-item" key={team}>
              <h5>
                <Link className="link" to={`/teams/${team}`}>
                  <span className="font-weight-bold">{teamCityName[team]}</span>
                </Link>
                {fourSpaces}
                <span className={`badge badge-success badge-pill`}>
                  {`${teamWinMap[team]} ${teamWinMap[team] === 1 ? 'win' : 'wins'}`}
                </span>
                {fourSpaces}
                {isDivisionLeader && <span className='badge badge-warning badge-pill'>&nbsp;Division Leader&nbsp;</span>}
              </h5>
            </li>
          )
        })
      }
    </ul>
  )
}

// {
//   /* for smaller screens */
// }
// <MediaQuery maxWidth={699}>
//   <CompareModalMobile {...props} />
// </MediaQuery>;

export default EntryTeamsTab;

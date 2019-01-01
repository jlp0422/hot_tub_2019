import React from 'react';
import ReactModal from 'react-modal';
import ReactGA from 'react-ga';
import { makeSentenceCase } from '../utils';

const CompareModalWeb = ({ showModal, closeModal, compareTeams, entries, teamCityName, teamWinMap, divisionLeaders, width }) => {
  ReactGA.event({
    category: 'Compare',
    action: 'mobile compare'
  })
  const numberOfTeams = compareTeams.length
  const teams = entries.reduce((memo, entry) => {
    compareTeams.includes(entry.id) && memo.push(entry)
    return memo
  }, [])
  const twoSpaces = <span>&nbsp;&nbsp;</span>;
  return (
    <ReactModal isOpen={showModal} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={closeModal}>
      <h2>Comparing {numberOfTeams} Teams</h2>
      {width < 449 &&
        <h6><span className='badge badge-warning badge-pill'>&nbsp;DW&nbsp;</span> indicates Division Winner</h6>
      }
      <div>
      {
        teams.map((team, index) => (
          <div style={{ gridRowStart: index+1}} key={team.id}>
            <h5>Team Name: { makeSentenceCase(team.teamName)}</h5>
            <h6>Wins: {team.selections.reduce((memo, team) => memo += teamWinMap[team], 0)}</h6>
            <ul>
              {
                team.selections.sort().map(selection => {
                  const teamWins = (
                    <span className="badge badge-success badge-pill">
                      {`${teamWinMap[selection]} ${teamWinMap[selection] === 1 ? 'win' : 'wins'}`}
                    </span>
                  )
                  const isDivisionLeader = divisionLeaders.find(leader => leader.teamAbbrev === selection)
                  const narrowText = (
                    <React.Fragment>
                      {selection}{twoSpaces}{teamWins}{twoSpaces}
                      {isDivisionLeader && <span className='badge badge-warning badge-pill'>&nbsp;DL&nbsp;</span>}
                    </React.Fragment>
                  )
                  const wideText = (
                    <React.Fragment>
                      {teamCityName[selection]}{twoSpaces}{teamWins}{twoSpaces}
                      {isDivisionLeader && <span className='badge badge-warning badge-pill'>&nbsp;Division Winner&nbsp;</span>}
                    </React.Fragment>
                  )
                  return (
                    <li key={selection}>
                    {
                      width < 449 ? narrowText : wideText
                    }
                    </li>
                  )
                })
              }
            </ul>
          </div>
        ))
      }
      </div>
      <button className="btn btn-outline-secondary" onClick={closeModal}>Close</button>
    </ReactModal>
  )
}

export default CompareModalWeb;

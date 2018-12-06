import React from 'react';
import ReactModal from 'react-modal';
import MediaQuery from 'react-responsive';
import ReactGA from 'react-ga';
import { makeSentenceCase } from '../utils';

const CompareModalWeb = ({ showModal, closeModal, compareTeams, entries, teamCityName, teamWinMap, divisionLeaders }) => {
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
      <MediaQuery maxWidth={449}>
        <h6><span className='badge badge-warning badge-pill'>&nbsp;DL&nbsp;</span> indicates Division Leader</h6>
      </MediaQuery>
      <div>
      {
        teams.map((team, index) => (
          <div style={{ gridRowStart: index+1}} key={team.id}>
            <h5>Team Name: { makeSentenceCase(team.teamName)}</h5>
            <h6>Wins: {team.selections.reduce((memo, team) => memo += teamWinMap[team], 0)}</h6>
            <ul>
              {
                team.selections.sort().map(selection => {
                  const isDivisionLeader = divisionLeaders.find(leader => leader.teamAbbrev === selection)
                  return (
                    <li key={selection}>
                      <MediaQuery minWidth={450}>
                        {teamCityName[selection]}{twoSpaces}
                      </MediaQuery>
                      <MediaQuery maxWidth={449}>
                        {selection}{twoSpaces}
                      </MediaQuery>
                      <span className="badge badge-success badge-pill">
                        {`${teamWinMap[selection]} ${teamWinMap[selection] === 1 ? 'win' : 'wins'}`}
                      </span>
                      {twoSpaces}
                      <MediaQuery minWidth={450}>
                        {isDivisionLeader && <span className='badge badge-warning badge-pill'>&nbsp;Division Leader&nbsp;</span>}
                      </MediaQuery>
                      <MediaQuery maxWidth={449}>
                        {isDivisionLeader && <span className='badge badge-warning badge-pill'>&nbsp;DL&nbsp;</span>}
                      </MediaQuery>
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

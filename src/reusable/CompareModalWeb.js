import React from 'react';
import ReactModal from 'react-modal';
import MediaQuery from 'react-responsive';
import ReactGA from 'react-ga';
import { makeSentenceCase } from '../utils';

const CompareModalWeb = ({ showModal, closeModal, compareTeams, entries, teamCityName, teamWinMap, divisionLeaders }) => {
  ReactGA.event({
    category: 'Compare',
    action: 'web compare'
  })
  const numberOfTeams = compareTeams.length
  const teams = entries.reduce((memo, entry) => {
    compareTeams.includes(entry.id) && memo.push(entry)
    return memo
  }, [])
  const fourSpaces = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
  return (
    <ReactModal isOpen={showModal} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={closeModal}>
      <h2>Comparing {numberOfTeams} Teams</h2>
      <div className="grid grid-compare margin-b-15" style={{ gridTemplateColumns: 'auto '.repeat(numberOfTeams)}}>
      {
        teams.map((team, index) => (
          <div key={team.id}>
            <h5>Team Name: { makeSentenceCase(team.teamName)}</h5>
            <h6>Wins: {team.selections.reduce((memo, team) => memo += teamWinMap[team], 0)}</h6>
            <ul>
              {
                team.selections.sort().map(selection => {
                  const isDivisionLeader = divisionLeaders.find(leader => leader.teamAbbrev === selection)
                  return (
                    <li key={selection}>
                      <MediaQuery query={`(min-width: ${numberOfTeams === 2 ? '661px' : '926px'})`}>
                        {teamCityName[selection]}{fourSpaces}
                      </MediaQuery>
                      <MediaQuery query={`(max-width: ${numberOfTeams === 2 ? '660px' : '925px'})`}>
                        {selection}{fourSpaces}
                      </MediaQuery>
                      <span className="badge badge-success badge-pill">
                        {`${teamWinMap[selection]} ${teamWinMap[selection] === 1 ? 'win' : 'wins'}`}
                      </span>
                      {fourSpaces}
                      {isDivisionLeader && <span className='badge badge-warning badge-pill'>&nbsp;Division Leader&nbsp;</span>}
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

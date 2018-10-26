import React from 'react';
import ReactModal from 'react-modal';
import MediaQuery from 'react-responsive';
import ReactGA from 'react-ga';
import { makeSentenceCase } from '../utils';

const CompareModalWeb = ({ showModal, closeModal, compareTeams, entries, teamCityName, teamWinMap }) => {
  ReactGA.event({
    category: 'Compare',
    action: 'mobile compare'
  })
  const numberOfTeams = compareTeams.length
  const teams = entries.reduce((memo, entry) => {
    compareTeams.includes(entry.id) && memo.push(entry)
    return memo
  }, [])
  return (
    <ReactModal isOpen={showModal} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={closeModal}>
      <h2>Comparing {numberOfTeams} Teams</h2>
      <div>
      {
        teams.map((team, index) => (
          <div style={{ gridRowStart: index+1}} key={team.id}>
            <h5>Team Name: { makeSentenceCase(team.teamName)}</h5>
            <h6>Wins: {team.selections.reduce((memo, team) => memo += teamWinMap[team], 0)}</h6>
            <ul>
                {team.selections.sort().map(selection => (
                  <li key={selection}>
                    <MediaQuery minWidth={401}>
                      {teamCityName[selection]}{'  '}
                    </MediaQuery>
                    <MediaQuery maxWidth={400}>
                      {selection}{'  '}
                    </MediaQuery>
                    <span className="badge badge-secondary badge-pill">
                      {`${teamWinMap[selection]} ${teamWinMap[selection] === 1 ? 'win' : 'wins'}`}
                    </span>
                  </li>
              ))}
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

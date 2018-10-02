import React from 'react';
import ReactModal from 'react-modal';
import MediaQuery from 'react-responsive';
import { makeSentenceCase } from './utils';

const CompareModal = ({ showModal, closeModal, compareTeams, entries, teamCityName, teamWinMap }) => {
  const selectedTeams = compareTeams.length
  const teams = entries.reduce((memo, entry) => {
    compareTeams.includes(entry.id) && memo.push(entry)
    return memo
  }, [])
  return (
    <ReactModal isOpen={showModal} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={closeModal} style={{
      content: {
      }
    }}>
      <h2>Compare Teams</h2>
      <div className="grid grid-compare margin-b-15" style={{ gridTemplateColumns: 'auto '.repeat(selectedTeams)}}>
      {
        teams.map((team, index) => (
          <div style={{ /*gridRowStart: index+1 */}} key={team.id}>
            <h5>Team Name: { makeSentenceCase(team.teamName)}</h5>
            <h6>Wins: {team.selections.reduce((memo, team) => memo += teamWinMap[team], 0)}</h6>
            <ul>
              { team.selections.sort().map(selection => (
                  <li key={selection}>{teamCityName[selection]}&nbsp;&nbsp;<span className="badge badge-secondary badge-pill">{`${teamWinMap[selection]} ${teamWinMap[selection] === 1 ? 'win' : 'wins'}`}</span></li>
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

export default CompareModal;

import React from 'react';
import ReactModal from 'react-modal';
import { makeSentenceCase } from './utils';

const CompareModal = ({ showModal, closeModal, compareTeams, entries, teamCityName, teamWinMap, entriesAndScore }) => {
  const teams = entries.reduce((memo, entry) => {
    compareTeams.includes(entry.id) && memo.push(entry)
    return memo
  }, [])
  return (
    <ReactModal isOpen={showModal} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={closeModal}>
      <h2>Compare Teams</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto '.repeat(compareTeams.length)}}>
      {
        teams.map(team => (
          <div key={team.id}>
            <h5>Team Name: { makeSentenceCase(team.teamName)}</h5>
            <h6>Wins: {team.selections.reduce((memo, team) => memo += teamWinMap[team], 0)}</h6>
            <ul>
              { team.selections.map(selection => (
                <li key={selection}>{teamCityName[selection]} ({teamWinMap[selection]})</li>
              ))}
            </ul>
          </div>
        ))
      }
      </div>
      <button onClick={closeModal}>Close</button>
    </ReactModal>
  )
}

export default CompareModal;

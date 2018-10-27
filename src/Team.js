import React from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { makeSentenceCase } from './utils';

const Team = ({ abbrev, entries, teamCityName, teamWinMap }) => {
  ReactGA.pageview('/teams/abbrev');
  const totalSelections = entries.reduce((memo, entry) => {
    if (entry.selections.includes(abbrev)) memo++
    return memo
  }, 0)
  const entriesWithTeam = entries.reduce((memo, entry) => {
    if (entry.selections.includes(abbrev)) memo.push(entry)
    return memo
  }, [])
  if (!entriesWithTeam.length || !entries.length) return null
  return (
    <div>
      <h2>{teamCityName[abbrev]}</h2>
      <h3>Total Wins: {teamWinMap[abbrev]}</h3>
      <h3>Total Selections: {totalSelections}</h3>
      <ul>
        {
          entriesWithTeam.map(entry => (
            <li key={entry.id}>
              <Link className="link" to={`/entry/${entry.id}`}>
                {makeSentenceCase(entry.teamName)}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Team;

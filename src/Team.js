import React from 'react';
import { Link } from 'react-router-dom';
import { makeSentenceCase } from './utils'

const Team = ({ abbrev, entries, teamCityName }) => {
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
      <h3>Total Selections: {totalSelections}</h3>
      <ul>
        { entriesWithTeam.map(entry => (
            <Link key={entry.id} to={`/entry/${entry.id}`}>
              <li>{makeSentenceCase(entry.teamName)}</li>
            </Link>
        )) }
      </ul>
    </div>
  )
}

export default Team;

import React from 'react';
import ReactGA from 'react-ga';
import TeamTotalsBarChart from './TeamTotals';
import TotalWinsAndTeams from './TotalWinsAndTeams';
import { teamColors } from '../utils'

const ChartsMain = ({entries, teamWinMap }) => {
  ReactGA.pageview('/charts');

  return (
    <div>
      <h2 style={{ paddingBottom: '10px' }}>Charts</h2>
      <TeamTotalsBarChart entries={entries} colors={teamColors} />
      <div style={{ padding: '20px 0' }}></div>
      <TotalWinsAndTeams entries={entries} teamWinMap={teamWinMap} />
    </div>
  )
}

export default ChartsMain;
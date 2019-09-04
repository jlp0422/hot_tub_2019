import React from 'react'
import ReactGA from 'react-ga'
import TeamTotalsBarChart from './TeamTotals'
// import TotalWinsAndTeams from './TotalWinsAndTeams'
import { teamColors } from '../utils'

const ChartsMain = ({ entries /*, teamWinMap, divisionLeaders*/ }) => {
	ReactGA.pageview('/charts')
	return (
		<div>
			<h2 style={{ paddingBottom: '10px' }}>Charts</h2>
			<TeamTotalsBarChart entries={entries} colors={teamColors} />
			<div style={{ padding: '20px 0' }} />
			{/* <h4 style={{ paddingBottom: '10px' }}>More charts coming soon</h4> */}
			{/*<TotalWinsAndTeams entries={entries} teamWinMap={teamWinMap}, divisionLeaders={divisionLeaders} />*/}
		</div>
	)
}

export default ChartsMain

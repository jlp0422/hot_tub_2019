import React from 'react'
import ReactGA from 'react-ga'
import TeamTotalsBarChart from './TeamTotals'
import { teamColors } from '../utils'

const ChartsMain = ({ entries }) => {
	ReactGA.pageview('/charts')
	return (
		<div>
			<h2 style={{ paddingBottom: '10px' }}>Charts</h2>
			<TeamTotalsBarChart entries={entries} colors={teamColors} />
		</div>
	)
}

export default ChartsMain

import React from 'react'
import { Chart } from 'react-google-charts'

const options = {
	title: 'Total Selections Per Team',
	chartArea: { width: '90%' },
	hAxis: {
		title: 'Teams'
	},
	vAxis: {
		title: 'Total Selections'
	},
	legend: { position: 'none' }
}

const TeamTotalsBarChart = ({ entries, colors }) => {
	const allSelections = entries.flatMap(({ selections }) => selections)
	const allSelectionsMap = allSelections.reduce((memo, team) => {
		if (!memo[team]) {
			memo[team] = 1
		} else {
			memo[team]++
		}
		return memo
	}, {})
	const teamData = Object.keys(allSelectionsMap)
		.sort()
		.map(team => [team, allSelectionsMap[team], `color: ${colors[team]}`])
	const chartData = ['Team Abbreviation', 'Selections', { role: 'style' }]
	const finalData = [chartData].concat(teamData)
	return (
		<Chart
			chartType={'ColumnChart'}
			width={'100%'}
			height={'400px'}
			data={finalData}
			loader={<h4>Loading chart...</h4>}
			options={options}
		/>
	)
}

export default TeamTotalsBarChart

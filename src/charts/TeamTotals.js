import React from 'react';
import { Chart } from 'react-google-charts';

const options = {
  title: 'Total Selections Per Team',
  chartArea: { width: '90%' },
  hAxis: {
    title: 'Teams',
  },
  vAxis: {
    title: 'Total Selections',
    // maxValue: '30'
  },
  legend: { position: 'none' },
}

const TeamTotalsBarChart = ({ entries, colors }) => {
  const allSelections = entries.reduce((memo, entry) => memo.concat(entry.selections), [])
  const allSelectionsMap = allSelections.reduce((memo, team) => {
    if (!memo[team]) memo[team] = 1
    else memo[team]++
    return memo
  }, {})
  const teamData = Object.keys(allSelectionsMap).sort().reduce((memo, team) => {
    memo.push([team, allSelectionsMap[team], `color: ${colors[team]}`])
    return memo
  }, [])
  const chartData = ["Team Abbreviation", "Selections", { role: "style" }]
  const finalData = [chartData].concat(teamData)
  return (
    <Chart
      chartType={"ColumnChart"}
      width={"100%"}
      height={"400px"}
      data={finalData}
      loader={<h4>Loading chart...</h4>}
      options={options}
    />
  )
}

export default TeamTotalsBarChart;

import React from 'react';
import { Chart } from 'react-google-charts';

const data = [
  ["Year", "Visitations", { role: "style" }],
  ["2010", 10, "color: gray"],
  ["2020", 14, "color: #76A7FA"],
  ["2030", 16, "color: blue"],
  ["2040", 22, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
  ["2050", 28, "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2"]
];

const options = {
  chart: { title: 'Total Selections Per Team' },
  hAxis: { title: 'Team Abbreviation' },
  vAxis: {
    title: 'Total Selections',
    minValue: 0,
  },
  // colors: ['red'],
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
  const chartData = ["Team", "Selections", { role: "style" }]
  const finalData = [chartData].concat(teamData)
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={finalData}
      loader={<h4>Loading chart...</h4>}
      options={options}
    />
  )
}

export default TeamTotalsBarChart;

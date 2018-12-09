import React from 'react'
import { Chart } from 'react-google-charts';
import { entriesWithScore } from '../utils'

const TotalWinsAndTeams = ({ entries, teamWinMap, isMaterial, divisionLeaders }) => {
  const entriesAndScore = entriesWithScore(entries, teamWinMap, divisionLeaders);
  const entryData = entriesAndScore.reduce((memo, entry) => {
    memo.push([entry.entryScore, entry.totalTeams, `Teams: ${entry.totalTeams}, Wins: ${entry.entryScore}` ])
    return memo
  }, [])
  const chartData = ["Total Score", "NFL Teams", { role: 'tooltip' }]
  const finalData = [chartData].concat(entryData)
  const minWins = entriesAndScore.reduce((min, next) => min.entryScore > next.entryScore ? next : min)
  const maxWins = entriesAndScore.reduce((min, next) => min.entryScore < next.entryScore ? next : min)
  const options = {
    /* material options */
    chart: { title: "Wins by number of NFL teams selected" },
    axes: {
      x: { 0: { label: 'Number of Wins' }, },
      y: { 0: { label: 'Number of Teams'} }
    },
    legend: { position: 'none' },
    /* classic options */
    // title: 'Total Score vs Number of Teams',
    // hAxis: { title: 'Total Score', minValue: minWins.entryScore, maxValue: maxWins.entryScore },
    // vAxis: { title: 'Number of Teams', minValue: 4, maxValue: 15 },
    // legend: 'none'
  }

  return (
    <Chart
      width="100%"
      height="400px"
      chartType="Scatter"
      loader={<div>Loading Chart</div>}
      data={finalData}
      options={options}
    />
  )
}

export default TotalWinsAndTeams

import React from 'react'
import { Chart } from 'react-google-charts';
import { entriesWithScore, makeSentenceCase } from '../utils'

const TotalWinsAndTeams = ({ entries, teamWinMap, isMaterial }) => {
  const entriesAndScore = entriesWithScore(entries, teamWinMap)
  const entryData = entriesAndScore.reduce((memo, entry) => {
    memo.push([entry.entryScore, entry.totalTeams, `Teams: ${entry.totalTeams}, Wins: ${entry.entryScore}` ])
    return memo
  }, [])
  const chartData = ["Total Score", "Number of Teams", { role: 'tooltip' }]
  const finalData = [chartData].concat(entryData)
  const minWins = entriesAndScore.reduce((min, next) => min.entryScore > next.entryScore ? next : min)
  const maxWins = entriesAndScore.reduce((min, next) => min.entryScore < next.entryScore ? next : min)
  const options = {
    /* material options */
    // chart: { title: "Total Score vs Number of Teams" },
    // axes: {
    //   x: { 0: { label: 'Total Score' }, },
    //   y: { 0: { label: 'Number of Teams'} }
    // },
    // legend: { position: 'none' },
    /* classic options */
    title: 'Total Score vs Number of Teams',
    hAxis: { title: 'Total Score', minValue: minWins.entryScore, maxValue: maxWins.entryScore },
    vAxis: { title: 'Number of Teams', minValue: 4, maxValue: 15 },
    legend: 'none'
  }

  console.log(minWins.entryScore, maxWins.entryScore)
  return (
    <Chart
      width="100%"
      height="400px"
      chartType="ScatterChart"
      loader={<div>Loading Chart</div>}
      data={finalData}
      options={options}
    />
  )
}

export default TotalWinsAndTeams

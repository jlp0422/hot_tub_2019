import React from 'react'
import { Chart } from 'react-google-charts';
import { entriesWithScore, makeSentenceCase } from '../utils'

const TotalWinsAndTeams = ({ entries, teamWinMap }) => {
  const entriesAndScore = entriesWithScore(entries, teamWinMap)
  const entryData = entriesAndScore.reduce((memo, entry) => {
    memo.push([entry.entryScore, entry.totalTeams ])
    return memo
  }, [])
  const chartData = ["Total Score", "Total Teams"]
  const finalData = [chartData].concat(entryData)
  const minWins = entriesAndScore.reduce((min, next) => min.entryScore > next.entryScore ? next : min)
  const maxWins = entriesAndScore.reduce((min, next) => min.entryScore < next.entryScore ? next : min)
  const options = {
    chart: { title: "Total Score vs Total Teams" },
    series: {
      0: { axis: 'score' }, // Bind series 0 to an axis named 'distance'.
      1: { axis: 'team' } // Bind series 1 to an axis named 'brightness'.
    },
    axes: {
      x: {
        score: { label: 'Total Score' },
      },
      y: {
        team: { label: 'Number of Teams' }
      }
    },
    hAxis: { title: 'Total Score', viewWindowMode: 'pretty'},//minValue: minWins.entryScore, maxValue: maxWins.entryScore },
    vAxis: { title: 'Total Teams', viewWindow: { max: 40 } },//: 'pretty' },// minValue: 4, maxValue: 11 },
    legend: { position: 'none' },
    trendlines: {
      0: {
        type: 'polynomial',
        degree: 3,
        // visibleInLegend: true,
      }
    }
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

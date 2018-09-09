import React from 'react';
import axios from 'axios';

class EntryScore extends React.Component {
  constructor() {
    super()
    this.state = {
      totalWins: 0
    }
    this.getSingleTeamScore = this.getSingleTeamScore.bind(this)
  }

  // componentDidMount() {
  //   const { teams } = this.props
  //   console.log('TEAM: ', teams[3])
  //   axios.get(`/api/standings/${teams[3]}`)
  //     .then(res => res.data)
  //     .then(teamInfo => console.log('TEAM WINS: ', teamInfo[0].teams[0].stats.standings))
  // }

  getSingleTeamScore(team) {
    axios.get(`/api/standings/${team}`)
      .then(res => res.data)
      .then(teamInfo => console.log('TEAM WINS: ', teamInfo[0].teams[0].stats.standings))
  }

  render() {
    const { teams } = this.props
    const { getSingleTeamScore } = this
    console.log(teams)
    return (
      <div>
      {
        teams.map(team => (
          <h3 key={team}>{getSingleTeamScore(team)}</h3>
        ))
      }
      </div>
    )
  }
}

export default EntryScore

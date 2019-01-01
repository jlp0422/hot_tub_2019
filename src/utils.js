export const makeSentenceCase = (str) => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const sortDivision = (a, b) => {
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return 1;
  return 0
}

export const sortByScore = (a, b) => {
  if (a.totalScore > b.totalScore) return -1;
  if (a.totalScore < b.totalScore) return 1;
  if (a.totalScore === b.totalScore) return sortByName(a, b)
}

export const sortByWeekScore = (a, b) => {
  if (a.entryScore > b.entryScore) return -1;
  if (a.entryScore < b.entryScore) return 1;
  if (a.entryScore === b.entryScore) return sortByName(a, b)
}

export const sortByName = (a, b) => {
  if (a.teamName < b.teamName) return -1;
  if (a.teamName > b.teamName) return 1;
  return 0;
}

export const allGamesToWeeksObject = (gamesArray) => {
  return gamesArray.reduce((memo, game) => {
    if (!memo[game.schedule.week]) memo[game.schedule.week] = [
      {
        week: game.schedule.week,
        awayTeam: game.schedule.awayTeam.abbreviation,
        homeTeam: game.schedule.homeTeam.abbreviation,
        awayScore: game.score.awayScoreTotal,
        homeScore: game.score.homeScoreTotal
      }
    ]
    else memo[game.schedule.week].push({
      week: game.schedule.week,
      awayTeam: game.schedule.awayTeam.abbreviation,
      homeTeam: game.schedule.homeTeam.abbreviation,
      awayScore: game.score.awayScoreTotal,
      homeScore: game.score.homeScoreTotal
    })
    return memo
  }, {})
}

export const totalWinsForWeek = (weeklyGamesObject, teams) => {
  let gameWinner
  const weeksArray = Object.keys(weeklyGamesObject).map(key => weeklyGamesObject[key])
  return weeksArray.reduce((memo1, week) => {
    const singleWeek = week.reduce((memo2, game) => {
      if (game.homeScore > game.awayScore) gameWinner = game.homeTeam
      else if (game.awayScore > game.homeScore) gameWinner = game.awayTeam
      if (teams.includes(gameWinner)) memo2++
      return memo2
    }, 0)
    memo1[`Week ${week[0].week}`] = singleWeek
    return memo1
  }, {})
}

export const entriesWithScore = (entries, teamWinMap, leaders, playoffMap) => {
  console.log('playoff', playoffMap)
  const divisionLeaderTeams = leaders.reduce((memo, team) => memo.concat(team.teamAbbrev), [])
  return entries.reduce((memoOne, entry) => {
    const { selections, teamName, id } = entry
    const entryScore = selections.reduce((memoTwo, team) => memoTwo += teamWinMap[team], 0)
    const divisonScore = selections.reduce((memoTwo, team) => memoTwo += divisionLeaderTeams.includes(team) ? 5 : 0, 0)
    const playoffScore = selections.reduce((memoTwo, team) => memoTwo += playoffMap[team] ? 3 : 0, 0)
    memoOne.push({
      id,
      teamName,
      entryScore,
      totalTeams: selections.length,
      divisonScore,
      playoffScore,
      totalScore: entryScore + divisonScore + playoffScore
    });
    return memoOne
  }, [])
}

export const parsePlayoffGames = (playoffGames) => {
  const { games } = playoffGames
  console.log(games)
  return games.reduce((memo, game) => {
    let winner;
    if (game.score.awayScoreTotal > game.score.homeScoreTotal) {
      winner = game.schedule.awayTeam.abbreviation
    }
    else if (game.score.awayScoreTotal < game.score.homeScoreTotal) {
      winner = game.schedule.homeTeam.abbreviation
    }
    if (!memo[winner]) memo[winner] = 0
    memo[winner]++
    return memo
  }, { KC: 1, LA: 1, NE: 1, NO: 1 })
}

export const weeks = [
  { number: 1, text: 'Week 1', firstGame: new Date('2018/09/06 08:00:00') },
  { number: 2, text: 'Week 2', firstGame: new Date('2018/09/13 08:00:00') },
  { number: 3, text: 'Week 3', firstGame: new Date('2018/09/20 08:00:00') },
  { number: 4, text: 'Week 4', firstGame: new Date('2018/09/27 08:00:00') },
  { number: 5, text: 'Week 5', firstGame: new Date('2018/10/05 08:00:00') },
  { number: 6, text: 'Week 6', firstGame: new Date('2018/10/12 08:00:00') },
  { number: 7, text: 'Week 7', firstGame: new Date('2018/10/19 08:00:00') },
  { number: 8, text: 'Week 8', firstGame: new Date('2018/10/26 08:00:00') },
  { number: 9, text: 'Week 9', firstGame: new Date('2018/11/02 08:00:00') },
  { number: 10, text: 'Week 10', firstGame: new Date('2018/11/09 08:00:00') },
  { number: 11, text: 'Week 11', firstGame: new Date('2018/11/16 08:00:00') },
  { number: 12, text: 'Week 12', firstGame: new Date('2018/11/23 08:00:00') },
  { number: 13, text: 'Week 13', firstGame: new Date('2018/11/30 08:00:00') },
  { number: 14, text: 'Week 14', firstGame: new Date('2018/12/07 08:00:00') },
  { number: 15, text: 'Week 15', firstGame: new Date('2018/12/14 08:00:00') },
  { number: 16, text: 'Week 16', firstGame: new Date('2018/12/21 08:00:00') },
  { number: 17, text: 'Week 17', firstGame: new Date('2018/12/28 08:00:00') },
  { number: 18, text: 'Wild Card Round', firstGame: new Date('2018/01/05 08:00:00') },
  { number: 19, text: 'Divisional Round', firstGame: new Date('2019/01/12 08:00:00') },
  { number: 20, text: 'Conference Championship', firstGame: new Date('2019/01/20 08:00:00') },
  { number: 21, text: 'Super Bowl', firstGame: new Date('2019/02/03 08:00:00') },
]

export const teamColors = {
  ARI: '#97233F',
  ATL: '#A71930',
  BAL: '#241773',
  BUF: '#00338D',
  CAR: '#0085CA',
  CHI: '#0B162A',
  CIN: '#FB4F14',
  CLE: '#311D00',
  DAL: '#003594',
  DEN: '#FB4F14',
  DET: '#0076B6',
  GB: '#203731',
  HOU: '#03202F',
  IND: '#002C5F',
  JAX: '#101820',
  KC: '#E31837',
  LAC: '#002A5E',
  LA: '#002244',
  MIA: '#008E97',
  MIN: '#4F2683',
  NE: '#002244',
  NO: '#D3BC8D',
  NYG: '#0B2265',
  NYJ: '#003F2D',
  OAK: '#000000',
  PHI: '#004C54',
  PIT: '#FFB612',
  SF: '#AA0000',
  SEA: '#002244',
  TB: '#D50A0A',
  TEN: '#002A5C',
  WAS: '#773141',
}

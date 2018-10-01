export const makeSentenceCase = (str) => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const sortDivision = (a, b, other) => {
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return 1;
  return 0
}

export const sortByScore = (a, b) => {
  if (a.entryScore > b.entryScore) return -1;
  if (a.entryScore < b.entryScore) return 1;
  return 0;
}

export const sortByName = (a, b) => {
  if (a.teamName < b.teamName) return -1;
  if (a.teamName > b.teamName) return 1;
  return 0;
}

export const weeks = [
  { number: 1, text: 'Week 1', firstGame: new Date('2018-09-06 08:00:00') },
  { number: 2, text: 'Week 2', firstGame: new Date('2018-09-13 08:00:00') },
  { number: 3, text: 'Week 3', firstGame: new Date('2018-09-20 08:00:00') },
  { number: 4, text: 'Week 4', firstGame: new Date('2018-09-27 08:00:00') },
  { number: 5, text: 'Week 5', firstGame: new Date('2018-10-05 08:00:00') },
  { number: 6, text: 'Week 6', firstGame: new Date('2018-10-12 08:00:00') },
  { number: 7, text: 'Week 7', firstGame: new Date('2018-10-19 08:00:00') },
  { number: 8, text: 'Week 8', firstGame: new Date('2018-10-26 08:00:00') },
  { number: 9, text: 'Week 9', firstGame: new Date('2018-11-02 08:00:00') },
  { number: 10, text: 'Week 10', firstGame: new Date('2018-11-09 08:00:00') },
  { number: 11, text: 'Week 11', firstGame: new Date('2018-11-16 08:00:00') },
  { number: 12, text: 'Week 12', firstGame: new Date('2018-11-23 08:00:00') },
  { number: 13, text: 'Week 13', firstGame: new Date('2018-11-30 08:00:00') },
  { number: 14, text: 'Week 14', firstGame: new Date('2018-12-07 08:00:00') },
  { number: 15, text: 'Week 15', firstGame: new Date('2018-12-14 08:00:00') },
  { number: 16, text: 'Week 16', firstGame: new Date('2018-12-21 08:00:00') },
  { number: 17, text: 'Week 17', firstGame: new Date('2018-12-28 08:00:00') },
]

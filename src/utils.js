export const makeSentenceCase = (str) => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const sortDivision = (a, b, other) => {
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return 1;
  return 0
}

export const sortEntries = (a, b) => {
  if (a.entryScore > b.entryScore) return -1;
  if (a.entryScore < b.entryScore) return 1;
  return 0;
}

import React from 'react';
import TeamTotalsBarChart from './TeamTotals';

const teamColors = {
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

const ChartsMain = ({ entries }) => {
  return (
    <div>
      <h2 style={{ paddingBottom: '10px' }}>Charts</h2>
      <TeamTotalsBarChart entries={ entries } colors={ teamColors }/>
    </div>
  )
}

export default ChartsMain;

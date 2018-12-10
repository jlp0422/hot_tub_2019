import React from 'react';

const TableHeader = ({ overallStandings }) => {
  return (
    <div className={`grid ${overallStandings ? 'grid-3-40-15-20-20' : 'grid-75-20'} entry-padding`}>
      {overallStandings && <div></div>}
      <h4>Team Name</h4>
      <h4>Wins</h4>
      {overallStandings && (
        <React.Fragment>
          <h4>Division Points</h4>
          <h4>Total Score</h4>
        </React.Fragment>
      )}
    </div>
  )
}

export default TableHeader;

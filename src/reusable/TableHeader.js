import React from 'react';

const TableHeader = ({ overallStandings }) => {
  return (
    <div className={`grid ${overallStandings ? 'grid-5-70-20' : 'grid-75-20'} entry-padding`}>
      {overallStandings && <div></div>}
      <div>
        <h3>Team Name</h3>
      </div>
      <div>
        <h3>Wins</h3>
      </div>
    </div>
  )
}

export default TableHeader;

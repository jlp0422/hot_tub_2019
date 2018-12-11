import React from 'react';

const TableHeader = ({ overallStandings, width }) => {
  return (
    <div className={`grid ${overallStandings ? 'grid-overall' : 'grid-75-20'} entry-padding`}>
      {overallStandings && <div></div>}
      <h4 className="font-weight-bold">Team Name</h4>
      <h4 className="table-text font-weight-bold">{ width > 510 ? 'Wins' : 'W' }</h4>
      {overallStandings && (
        <React.Fragment>
          <h4 className="table-text font-weight-bold">{ width > 510 ? 'Division' : 'D' }</h4>
          <h4 className="table-text font-weight-bold">{ width > 510 ? 'Playoff' : 'P' }</h4>
          <h4 className="table-text font-weight-bold">{ width > 510 ? 'Total' : 'T' }</h4>
        </React.Fragment>
      )}
    </div>
  )
}

export default TableHeader;

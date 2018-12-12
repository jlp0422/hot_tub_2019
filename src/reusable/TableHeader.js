import React from 'react';
import ReactTooltip from 'react-tooltip'


const TableHeader = ({ overallStandings, width }) => {
  return (
    <div className={`grid ${overallStandings ? 'grid-overall' : 'grid-75-20'} entry-padding`}>
      {overallStandings && <div></div>}
      <h4 className="tk font-weight-bold">Team Name</h4>
      <h4 className="tk table-text font-weight-bold">{ width > 510 ? 'Wins' : 'W' }</h4>
      {overallStandings && (
        <React.Fragment>
          <h4 data-tip data-for='division' className="tk table-text font-weight-bold">{ width > 510 ? 'Division*' : 'D' }</h4>
          <h4 data-tip data-for='playoff' className="tk table-text font-weight-bold">{ width > 510 ? 'Playoff*' : 'P' }</h4>
          <h4 className="tk table-text font-weight-bold">{ width > 510 ? 'Total' : 'T' }</h4>
        </React.Fragment>
      )}
      { width > 510 &&
        <React.Fragment>
          <ReactTooltip effect="solid" id='division'>
            <span>Projected points from Division winners</span>
          </ReactTooltip>
          <ReactTooltip effect="solid" id='playoff'>
            <span>Playoff Points (3pts per win)</span>
          </ReactTooltip>
        </React.Fragment>
      }

    </div>
  )
}

export default TableHeader;

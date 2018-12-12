import React from 'react';

const TableKey = ({ isKeyOpen, toggleKey }) => {
  const tableKey = {
    'W': 'Regular Season Wins',
    'D': 'Division Winner Points (projected)',
    'P': 'Playoff Points (3pts per win)',
    'T': 'Total Score (Regular Season + Division + Playoffs)'
  }
  const open = <span>&nbsp;&raquo;</span>
  const close = <span>&nbsp;&laquo;</span>
  return (
    <div>
      <h6 className="font-weight-bold pointer" onClick={ toggleKey }>
        { isKeyOpen ? 'Hide ' : 'Show ' }Key
      </h6>
      {isKeyOpen &&
        <React.Fragment>
          {Object.keys(tableKey).map(abbrev => (
            <h6 className="key-text" key={abbrev}>{abbrev}: {tableKey[abbrev]}</h6>
          ))}
        </React.Fragment>
      }
    </div>
  )
}

export default TableKey;

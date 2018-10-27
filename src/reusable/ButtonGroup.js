import React from 'react';

const ButtonGroup = ({
  buttonAction,
  isSort,
  copyLeft,
  disabledLeft,
  sortLeft,
  copyRight,
  disabledRight,
  sortRight
}) => {
  return (
    <div className={`grid grid-${isSort ? 'sort' : 'compare'}-btns`}>
      <h4>{buttonAction}</h4>
      <button className={`btn btn-${isSort ? 'warning' : 'success'} button-font`} disabled={disabledLeft} onClick={sortLeft}>
        {copyLeft}
      </button>
      <button className={`btn btn-${isSort ? 'warning' : 'danger'} button-font`} disabled={disabledRight} onClick={sortRight}>
        {copyRight}
      </button>
    </div>
  )
}

export default ButtonGroup;

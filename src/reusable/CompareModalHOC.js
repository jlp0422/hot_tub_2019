import React from 'react';
import MediaQuery from 'react-responsive';
import ReactGA from 'react-ga';
import CompareModalWeb from './CompareModalWeb';
import CompareModalMobile from './CompareModalMobile';

const CompareModalHOC = (props) => {
  ReactGA.pageview('/compare-modal');
  return (
    <div>
      {/* for larger screens */}
      <MediaQuery minWidth={700}>
        <CompareModalWeb {...props} />
      </MediaQuery>

      {/* for smaller screens */}
      <MediaQuery maxWidth={699}>
        <CompareModalMobile {...props} />
      </MediaQuery>
    </div>
  )
}

export default CompareModalHOC;

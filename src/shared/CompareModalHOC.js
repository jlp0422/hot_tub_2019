import React from 'react'
import ReactGA from 'react-ga'
import CompareModalWeb from './CompareModalWeb'
import CompareModalMobile from './CompareModalMobile'

const CompareModalHOC = ({ width, ...rest }) => {
	ReactGA.pageview('/compare-modal')
	return (
		<div>
			{width < 755 ? (
				<CompareModalMobile {...rest} />
			) : (
				<CompareModalWeb {...rest} />
			)}
		</div>
	)
}

export default CompareModalHOC

import React from 'react'
import ReactGA from 'react-ga'
import CompareModalWeb from './CompareModalWeb'
import CompareModalMobile from './CompareModalMobile'

const CompareModalHOC = props => {
	const { width } = props
	ReactGA.pageview('/compare-modal')
	return (
		<div>
			{width < 755 ? (
				<CompareModalMobile {...props} />
			) : (
				<CompareModalWeb {...props} />
			)}
		</div>
	)
}

export default CompareModalHOC

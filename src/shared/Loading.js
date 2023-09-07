import React from 'react'

const Loading = ({ home }) => {
	return home ? (
		<div className="container container-margin">
			<h1>Hot Tub 2023</h1>
			<h2>Loading...</h2>
		</div>
	) : (
		<h4>Loading...</h4>
	)
}

export default Loading

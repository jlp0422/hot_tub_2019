import React from 'react'
import ReactGA from 'react-ga'
import WeeklyWinsTab from './WeeklyWinsTab'
import EntryTeamsTab from './EntryTeamsTab'
import { makeSentenceCase, entriesWithScore } from './utils'

const TeamEntry = ({
	id,
	entries,
	entry,
	teamWinMap,
	teamCityName,
	history,
	divisionLeaders,
	playoffWinMap,
	width
}) => {
	ReactGA.pageview(`/entry/${id}`)
	let tab = history.location.hash.slice(1)
	const entriesAndScore = entriesWithScore(
		entries,
		teamWinMap,
		divisionLeaders,
		playoffWinMap
	)
	const entryWithScore = entriesAndScore.find(e => e.id === Number(id))
	if (!tab) {
		tab = 'teams'
	}
	if (!entry.id) {
		return null
	}
	return (
		<div>
			<h2>Team Name: {makeSentenceCase(entry.teamName)}</h2>
			<h3>Total wins: {entryWithScore.totalScore}</h3>
			<ul className="nav nav-tabs nav-fill margin-b-15">
				<li className="nav-item">
					<span
						onClick={() => history.push(`/entry/${id}#teams`)}
						className={`nav-link ${tab === 'teams' &&
							'active font-weight-bold'}`}
					>
						Teams
					</span>
				</li>
				<li className="nav-item">
					<span
						onClick={() => history.push(`/entry/${id}#wins`)}
						className={`nav-link ${tab === 'wins' &&
							'active font-weight-bold'}`}
					>
						Weekly Wins
					</span>
				</li>
			</ul>
			{tab === 'teams' ? (
				<EntryTeamsTab
					width={width}
					divisionLeaders={divisionLeaders}
					entry={entry}
					teamCityName={teamCityName}
					teamWinMap={teamWinMap}
				/>
			) : (
				<WeeklyWinsTab entry={entry} />
			)}
		</div>
	)
}

export default TeamEntry

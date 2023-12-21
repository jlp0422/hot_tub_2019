// TODO: update with new teams
// team abbreviations can be found at: https://github.com/jlp0422/hot_tub_2019/blob/c68e3af38efaa3c0fdbf2470673ff7412060da74/src/utils.js#L201

export default [
	{
		teamName: 'The Harris Boys',
		selections: [ 'PHI', 'BAL', 'NYJ', 'TEN']
	},
	{
		teamName: '5000 Beach',
		selections: ['PHI', 'NYJ', 'LA', 'CAR', 'HOU', 'ARI']
	},
	{
		teamName: '95 Birds',
		selections: ['PHI', 'BAL', 'NO', 'LA']
	},
	{
		teamName: 'BATTLECARD',
		selections: ['CIN', 'SF', 'DET', 'MIA']
	},
	{
		teamName: 'Bean',
		selections: ['PHI', 'CIN', 'NO', 'SEA']
	},
	{ teamName: 'PopPops', selections: ['PHI', 'CIN', 'DAL', 'TB'] },
	{ teamName: "Gawn Fish'n", selections: ['PHI', 'JAX', 'NYJ', 'NO'] },
	{ teamName: 'Bonebeater', selections: ['BUF', 'SF', 'LAC', 'NO'] },
	{
		teamName: 'Green Team',
		selections: ['CIN', 'JAX', 'NO', 'CHI', 'CAR']
	},
	{
		teamName: 'Peanut Dad',
		selections: ['KC', 'MIN', 'NO', 'NE', 'LA']
	},
	{
		teamName: 'Price Fighters',
		selections: ['SEA', 'NYG', 'TEN', 'PIT', 'ATL', 'WAS']
	},
	{
		teamName: 'SH20',
		selections: ['KC', 'BAL', 'JAX', 'TEN']
	},
	{ teamName: 'Kotite', selections: ['BUF', 'NO', 'SEA', 'CHI', 'PIT'] },
	{
		teamName: 'Losers',
		selections: ['GB', 'LV', 'NE', 'ATL', 'IND', 'TB', 'ARI']
	},
	{
		teamName: 'Bernie',
		selections: ['BUF', 'SF', 'JAX', 'NO']
	},
	{
		teamName: 'BRENDONT',
		selections: [
			'PHI',
			'JAX',
			'NYJ',
			'NO',
		]
	},
	{
		teamName: 'BudzToo',
		selections: ['CIN', 'MIA', 'NO', 'DEN', 'LA']
	},
	{
		teamName: 'King and Queen',
		selections: ['CIN', 'SF', 'JAX', 'SEA']
	},
	{ teamName: 'Judes', selections: ['PHI', 'KC', 'NYJ', 'CAR'] },
	{
		teamName: 'Jerco',
		selections: ['PHI', 'BAL', 'MIN', 'SEA']
	},
	{
		teamName: 'BudzWon',
		selections: ['KC', 'SF', 'NYJ', 'LV']
	},
	{
		teamName: 'Disco Stu',
		selections: ['CIN', 'DAL', 'JAX', 'MIN']
	},
	{
		teamName: 'Empty Nesters +1',
		selections: ['DAL', 'JAX', 'DET', 'PIT', 'LA']
	},
	{
		teamName: 'Rock Bottom',
		selections: ['JAX', 'MIN', 'NO', 'ATL', 'SEA']
	},
	{
		teamName: 'PREZ SQUARED',
		selections: ['PHI', 'BUF', 'CIN', 'CAR']
	},
	{
		teamName: 'Pickle Ricks',
		selections: ['BUF', 'SF', 'JAX', 'NO']
	},
	{
		teamName: 'Dolphin Doll',
		selections: ['KC', 'CIN', 'NO', 'SEA']
	},
	{
		teamName: 'Eskimo Bros',
		selections: ['CIN', 'SF', 'TEN', 'NE', 'LA']
	},
	{
		teamName: 'gjfeeney@comcast.net',
		selections: ['KC', 'CIN', 'MIA', 'DEN']
	},
	{
		teamName: 'Golden Thunder',
		selections: ['BUF', 'NYJ', 'NYG', 'LV', 'LA']
	},
	{
		teamName: 'Spaz',
		selections: ['KC', 'DAL', 'MIA', 'NO']
	},
	{
		teamName: 'Sports Night 4EV',
		selections: ['PHI', 'DET', 'DEN', 'LV', 'CAR']
	},
	{
		teamName: 'Stuck In The Middle',
		selections: ['CIN', 'DAL', 'NYJ', 'DET']
	},
	{
		teamName: 'The Hedge',
		selections: ['BUF', 'NE', 'ATL', 'LA', 'CAR', 'HOU', 'ARI']
	},
	{
		teamName: 'The Theiss is Right',
		selections: ['BUF', 'CIN', 'DEN', 'ATL', 'CAR']
	},
	{
		teamName: 'Who Knows?',
		selections: ['KC', 'BAL', 'MIA', 'NO']
	},
	}
		teamName: 'Pack 17',
		selections: ['BUF', 'LAC', 'GB', 'LV', 'NE']
},
	{
		teamName: 'Charlottes Web',
		selections: ['BAL', 'JAX', 'DET', 'ATL', 'IND']}
].map((entry, index) => ({
	...entry,
	id: index + 1
}))

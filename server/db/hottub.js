const fs = require('fs')
const readline = require('readline')
const filename = process.argv[2]
const Entry = require('./Entry')

const rd = readline.createInterface({
	input: fs.createReadStream(filename),
	console: false
})

rd.on('line', line => {
	const teamArr = line.split(',').filter(team => team)
	const teamObj = {
		teamName: teamArr[0],
		selections: teamArr.slice(1)
	}
	Entry.create(teamObj)
	// Entry.create({
	//   teamName: teamArr[0],
	//   selections: teamArr.slice(1)
	// })
})

// rd.on('close', () => {
//   console.log('ALL DONE')
//   process.exit(0);
// })

import React from 'react';
import axios from 'axios';
import EntryScore from './EntryScore';

class Standings extends React.Component {
  constructor() {
    super()
    this.state = {
      entries: []
    }
  }

  componentDidMount() {
    axios.get('/api/entries')
      .then(res => res.data)
      .then(entries => this.setState({ entries }))
  }

  render() {
    const { entries } = this.state
    const { makeSentenceCase } = this
    if (!entries.length) return null;
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
          <div>
            <h2>Team Name</h2>
          </div>
          <div>
            <h2>Score</h2>
          </div>
        </div>
        {/*
          entries.map(entry => (
            <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
              <div>
                <h3>{entry.teamName}</h3>
              </div>
              <div>
                <EntryScore teams={entry.selections} />
              </div>
            </div>
          ))
        */}
        <div key={entries[3].id} style={{ display: 'grid', gridTemplateColumns: '60% 30%' }}>
          <div>
            <h3>{entries[3].teamName}</h3>
          </div>
          <div>
            <EntryScore teams={entries[3].selections} />
          </div>
        </div>
      </div>
    )
  }
}

export default Standings;

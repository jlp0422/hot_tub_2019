import React from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'
import App from './App'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-128159832-2')
ReactModal.setAppElement('#root')

const root = document.getElementById('root')

ReactDOM.render(<App />, root)

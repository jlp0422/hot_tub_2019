import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import App from './App';
import ReactGA from 'react-ga';

ReactModal.setAppElement('#root');
ReactGA.initialize('UA-128159832-1');

const root = document.getElementById('root');

ReactDOM.render(<App />, root)

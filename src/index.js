import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import App from './App';

ReactModal.setAppElement('#root');

const root = document.getElementById('root');

ReactDOM.render(<App />, root)

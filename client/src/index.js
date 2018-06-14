import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const NOTE_URL = 'http://localhost:5000/note';

const fetchNextNote = (sequence_number) => 
  fetch(NOTE_URL + '/' + sequence_number).then(response => response.json());

const checkAnswer = (sequence_number, answer) => 
  fetch(NOTE_URL + '/' + sequence_number, {
    body: JSON.stringify(answer),
    cache: 'no-cache',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(response => response.json());

ReactDOM.render(
  <App
    fetchNextNote={fetchNextNote}
    checkAnswer={checkAnswer}
  />,
  document.getElementById('root')
);
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const NOTE_URL = 'http://localhost:5000/note';

<<<<<<< HEAD
const fetchNextNote = () =>
  fetch(NOTE_URL).then(response => response.json());

const checkAnswer = (answer) =>
  fetch(NOTE_URL, {
=======
const fetchNextNote = (sequence_number) => 
  fetch(NOTE_URL + '/' + sequence_number).then(response => response.json());

const checkAnswer = (sequence_number, answer) => 
  fetch(NOTE_URL + '/' + sequence_number, {
>>>>>>> 71d6ec3f6b270badb7dd061969f9546266af81bf
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
// registerServiceWorker();

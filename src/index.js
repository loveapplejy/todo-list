import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const title = 'To Do List';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
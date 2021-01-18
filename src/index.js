import ReactDOM from 'react-dom';

import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

import './global.css';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import IndexProvider from './context/index'





ReactDOM.render(
  <React.StrictMode>
    <IndexProvider>
      <App/>
    </IndexProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
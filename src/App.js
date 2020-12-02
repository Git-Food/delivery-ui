import './App.css';

import React from 'react';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Page from './components/Page';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore();

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Page />
      </Provider>
    </Router>
  );
}

export default App;

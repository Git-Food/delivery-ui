import './App.css';

import React from 'react';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import Page from './components/Page';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';

const store = configureStore();

function App() {
  return (
    <Router>
      <AuthProvider>
        <Provider store={store}>
          <Page />
        </Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;

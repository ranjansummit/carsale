import React, {Component} from 'react';
import {Provider} from 'react-redux';

import Router from './Router';
import configureStore from './store/configureStore';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  render() {
    return (
      <Provider store={configureStore()}>
        <Router />
      </Provider>
    );
  }
}

export default App;

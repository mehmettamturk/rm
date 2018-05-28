import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as tasksSelectors from './store/tasks/reducer';

// View and Css
import Layout from './layout/Layout.js';
import 'bulma/css/bulma.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    // isSelectionFinalized: tasksSelectors.isTaskSelectionFinalized(state)
  };
}

export default connect(mapStateToProps)(App);

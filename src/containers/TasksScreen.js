// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './TasksScreen.css';
import * as tasksActions from '../store/tasks/actions';
import * as tasksSelectors from '../store/tasks/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';

class TasksScreen extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(tasksActions.fetchTasks());
  }

  render() {
    if (!this.props.tasksByUrl) return this.renderLoading();
    return (
      <div className="TasksScreen">
        <div className="columns is-mobile">
            <div className="column is-info">1</div>
            <div className="column">2</div>
            <div className="column">3</div>
            <div className="column">4</div>
        </div>
        <h3>Choose 3 tasks of interest</h3>
        <ListView
          rowsIdArray={this.props.tasksUrlArray}
          rowsById={this.props.tasksByUrl}
          renderRow={this.renderRow} />
        {!this.props.canFinalizeSelection ? false :
          <button className="NextScreen" onClick={this.onNextScreenClick} />
        }
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(taskUrl, task) {
    const selected = this.props.selectedTasksByUrl[taskUrl];
    return (
      <ListRow
        rowId={taskUrl}
        onClick={this.onRowClick}
        selected={selected}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </ListRow>
    )
  }

  onRowClick(taskUrl) {
    this.props.dispatch(tasksActions.selectTask(taskUrl));
  }

  onNextScreenClick() {
    this.props.dispatch(tasksActions.finalizeTaskSelection());
  }

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  const [tasksByUrl, tasksUrlArray] = tasksSelectors.getTasks(state);
  return {
    tasksByUrl,
    tasksUrlArray,
    selectedTasksByUrl: tasksSelectors.getSelectedTasksByUrl(state),
    canFinalizeSelection: tasksSelectors.isTaskSelectionValid(state)
  };
}

export default connect(mapStateToProps)(TasksScreen);
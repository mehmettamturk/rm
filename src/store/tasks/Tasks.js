import React from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import { withFirestore } from './utils';
import Task from './Task';
import NewTask from './NewTask';

const Tasks = ({ tasks, onNewSubmit, onDoneClick }) => {
    console.log(tasks);

    const cp = tasks;

    let betaTasks = [];
    let pendingTasks = [];
    let prodTasks = [];
    if (cp) {
      betaTasks = cp.filter((task) => task.status == 'Beta');
      pendingTasks = cp.filter((task) => task.status == 'Pending');
      prodTasks = cp.filter((task) => task.status == 'Prod');
    }

    return (
  <div>
    <NewTask onNewSubmit={onNewSubmit} />
    {
      tasks === undefined
      ? <span>Loading</span>
      : !tasks.length
        ? <span>No tasks found</span>
        :
        (
          <div className="columns">
            <div className="column task-container c-pending">
              <strong> Pending </strong>
              {
                pendingTasks.map((task, i) => (
                  <Task
                    key={`${task.id}-${i}`}
                    task={task}
                  />
                ))
              }
            </div>
            <div className="column task-container c-beta">
              <strong> Beta </strong>
              {
                betaTasks.map((task, i) => (
                  <Task
                    key={`${task.id}-${i}`}
                    task={task}
                  />
                ))
              }
            </div>
            <div className="column task-container c-prod">
              <strong> Prod </strong>
              {
                prodTasks.map((task, i) => (
                  <Task
                    key={`${task.id}-${i}`}
                    task={task}
                  />
                ))
              }
            </div>
        </div>
        )
        
    }
  </div>
)}

Tasks.propTypes = {
    tasks: PropTypes.array,
    onNewSubmit: PropTypes.func.isRequired,
    store: PropTypes.shape({
      firestore: PropTypes.object
    })
}

// Create HOC that loads data and adds it as tasks prop
const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadData: props => err => props.firestore.setListener({
      collection: 'tasks',
      orderBy: ['created_at', 'desc'],
      limit: 10
    }),
    onNewSubmit: props => newTask =>
      props.firestore.add('tasks', {
        ...newTask,
        owner: 'Anonymous',
        created_at: props.firestore.FieldValue.serverTimestamp()
      }),
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      this.props.loadData()
    },
    componentWillUnmount() {
      this.props.firestore.unsetListener({
        collection: 'tasks',
        orderBy: ['created_at', 'desc'],
        limit: 10
      })
    }
  }),
  // Connect tasks from redux state to props.tasks
  connect(({ firestore }) => ({ // state.firestore
    tasks: firestore.ordered.tasks, // document data in array
    // tasks: firestore.data.tasks, // document data by id
  }))
)

export default enhance(Tasks)
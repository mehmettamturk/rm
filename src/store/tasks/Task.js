import React from 'react';
import PropTypes from 'prop-types'
import { compose, flattenProp, withHandlers, pure } from 'recompose'
import { withFirestore } from './utils';
import './Task.css';


const Task = ({
  id,
  name,
  created_at,
  gitlab_url,
  jira_url,
  status,
  branch
}) => (
  <div className="task-item" id={id} data-created-at={created_at} data-branch={branch}>
    <span className="task-name"> {name} </span>
    <span className="task-links"> 
      <a href={gitlab_url} target="_blank"> Gitlab </a> 
      <a href={jira_url} target="_blank"> Jira </a>
    </span>
    <span className="task-status"> {status} </span> 
  </div>
);

Task.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    created_at: PropTypes.string,
    gitlab_url: PropTypes.string,
    jira_url: PropTypes.string,
    status: PropTypes.string,
    branch: PropTypes.string,
    firestore: PropTypes.shape({
      update: PropTypes.func.isRequired
    })
}

const enhance = compose(
  withFirestore,
  flattenProp('task'),
  withHandlers({
    onDoneClick: props => () => {
      return props.firestore.update(`task/${props.id}`, { status: 'Prod' })
    }
  }),
  pure
)

export default enhance(Task)
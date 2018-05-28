import React from 'react';
import { get } from 'lodash';
import { withHandlers, withStateHandlers, compose } from 'recompose';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem'
  }
};

//   id,
//   name,
//   created_at,
//   gitlab_url,
//   jira_url,
//   status,
//   branch

const NewTask = ({ onInputChange, onNewClick }) => (
  <div style={styles.container}>
    <input onChange={onInputChange} type="text" placeholder="ID"/>
    <input onChange={onInputChange} type="text" placeholder="name"/>
    <input onChange={onInputChange} type="text" placeholder="created_at"/>
    <input onChange={onInputChange} type="text" placeholder="gitlab_url"/>
    <input onChange={onInputChange} type="text" placeholder="jira_url"/>
    <input onChange={onInputChange} type="text" placeholder="status"/>
    <input onChange={onInputChange} type="text" placeholder="branch"/>
    <button onClick={onNewClick}>Submit</button>
  </div>
)

const enhance = compose(
  withStateHandlers(({
    initialInputValue = null
  }) => ({
    inputValue: initialInputValue
  }), {
    onInputChange: (state) => (e) => ({
      inputValue: get(e, 'target.value', null)
    })
  }),
  withHandlers({
    onNewClick: props => () => {
      // Submit new task
      props.onNewSubmit({
        text: props.inputValue,
        done: false
      })
      // Reset input
      props.onInputChange()
    }
  })
)

export default enhance(NewTask)
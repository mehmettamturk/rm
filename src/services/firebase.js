import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
 firestoreConnect(['todos']), // or { collection: 'todos' }
 connect((state, props) => ({
   todos: state.firestore.ordered.todos
 }))
)(SomeComponent)
import _ from 'lodash';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
const myProjectsReduxName = 'myProjects';

compose(
  firestoreConnect(props => [
    { path: 'tasks' }
  ]),
  connect((state, props) => ({
    projects: state.firestore.data.projects,
    myProjects: state.firestore.data['tasks'], // use storeAs path to gather from redux
  }))
)

class DBService {

  async getDefaultTasks() {
    const url = `${REDDIT_ENDPOINT}/subreddits/default.json`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`RedditService getDefaultSubreddits failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    const children = _.get(data, 'data.children');
    if (!children) {
      throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
    }
    const sortedBySubscribers = _.orderBy(children, 'data.subscribers', 'desc');
    return _.map(sortedBySubscribers, (subreddit) => {
      // abstract away the specifics of the reddit API response and take only the fields we care about
      return {
        title: _.get(subreddit, 'data.display_name'),
        description: _.get(subreddit, 'data.public_description'),
        url: _.get(subreddit, 'data.url')
      }
    });
  }

}

export default new DBService();
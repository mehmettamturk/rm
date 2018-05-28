import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Site from './Site';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

// import TasksScreen from '../containers/TasksScreen';
import Tasks from '../store/tasks/Tasks';

class Layout extends Component {
  render() {
    return (
      <div className="App">
        <Site>
          <Helmet
            title="Release Me"
            meta={[
              { name: 'description', content: 'Release Manager' },
              { name: 'keywords', content: 'release, manager' },
            ]}
            script={[
              { 'src': 'https://use.fontawesome.com/releases/v5.0.4/js/all.js'},
            ]}
            link={[
              {'rel':'stylesheet', 'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'}
            ]}
          />
          <Header />
          <Content>
            <Tasks />
            {/* <TaskList />  */}
            
          </Content>
          <Footer />
        </Site>
      </div>
    );
  }
}

export default Layout;
import { createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase';
import 'firebase/firestore';

const fbConfig = {
    apiKey: "AIzaSyBp7UvB09W6349XOmuToCtmGs48Q3PJdMo",
    authDomain: "aaaxx-4f7dd.firebaseapp.com",
    databaseURL: "https://aaaxx-4f7dd.firebaseio.com",
    projectId: "aaaxx-4f7dd",
    storageBucket: "aaaxx-4f7dd.appspot.com",
    messagingSenderId: "426361816057"
}

firebase.initializeApp(fbConfig);
firebase.firestore();


// import * as reducers from './store/reducers';
// const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

export default function configureStore(initialState, history) {
  const enhancers = []
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  enhancers.push(applyMiddleware(thunk));

  const createStoreWithMiddleware = compose(
    reduxFirestore(firebase,
      {
        userProfile: 'users'
      }
    ),
    ...enhancers
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer);

  return store;
}
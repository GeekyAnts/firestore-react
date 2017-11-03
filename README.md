# Firestore Data Provider for React Component

`react-firestore` provides `createContainer()` function (inspired by Meteor) which creates a HOC to provide Firestore data for your React Components.

## Examples

```ts

import createContainer from 'react-firebase';

import * as firebase from 'firebase';
require('firebase/firestore');

const db = firebase.firestore();

class App extends React.Component {
  
  render() {
    // this.props.users receives data
  }

}

const AppWithData = createContainer(App, () => {
  return {
    users: db.collection('users')
  }
})

```
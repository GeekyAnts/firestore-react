# Firestore Data Provider for React Component

`react-firestore` provides `createContainer()` function (inspired by Meteor) which creates a HOC to provide Firestore data for your React Components.

## Provides two things

1. Fetches data and passes down to the presentational components
2. Adds a subscriber to listen to live snapshot updates on the query and also removes the subscriber when component is unmounted.

## Examples

```ts

import createContainer from 'react-firebase';

class App extends React.Component {
  
  render() {
    // this.props.users receives data
  }

}

const AppWithData = createContainer(App, (db) => {
  return {
    users: db.collection('users')
  }
})

```
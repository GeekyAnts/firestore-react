import * as React from "react";
import "./App.css";
import "./firebaseConfig";

import createContainer from "firestore-react";

const logo = require("./logo.svg");

class App extends React.Component<any, any> {
  renderUsers() {
    var list: any = [];

    this.props.users.snapshot.forEach((doc: any) => {
      list.push(<li>{doc.data().first}</li>);
    });

    return list;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.props.name}: List of users</h2>
        </div>
        <p className="App-intro">
          {this.props.users.loading ? <div>Loading</div> : this.renderUsers()}
        </p>
      </div>
    );
  }
}

export default createContainer(App, (db: any) => {
  return {
    users: db.collection("users")
  };
});

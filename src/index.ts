import * as React from "react";
import * as firebase from "firebase";

export interface QueryMap {
  [key: string]: firebase.firestore.Query;
}

export function createContainer(
  WrappedComponent: any,
  queryMapFn: (db: any, props: any) => QueryMap
) {
  return class extends React.Component<any, any> {
    results: any;

    constructor(props: any) {
      super(props);
      this.state = {};
    }

    componentWillMount() {
      let db = firebase.firestore();
      let queryMap: QueryMap = queryMapFn(db, this.props);

      this.results = {};

      for (var key in queryMap) {
        this.results[key] = {
          loading: true,
          promise: queryMap[key].get(),
          snapshot: null
        };

        this.results[key].unsubscribe = queryMap[key].onSnapshot(snapshot => {
          this.setState({
            results: {
              [key]: {
                snapshot: snapshot
              }
            }
          });
        });

        this.results[key].promise.then((snapshot: any) => {
          this.setState({
            results: {
              [key]: {
                loading: false,
                snapshot: snapshot
              }
            }
          });
        });
      }

      this.setState({
        results: this.results
      });
    }

    componentWillUnmount() {
      for (var i in this.results) {
        this.results[i].unsubscribe();
      }
    }

    render(): any {
      return React.createElement(WrappedComponent, {
        ...this.state.results,
        ...this.props
      });
    }
  };
}

export default createContainer;

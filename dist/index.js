var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from "react";
import * as firebase from "firebase";
export function createContainer(WrappedComponent, queryMapFn) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            return _this;
        }
        class_1.prototype.componentWillMount = function () {
            var _this = this;
            var db = firebase.firestore();

            var queryMap = queryMapFn(db, _this.props);

            this.results = {};
            for (var key in queryMap) {
                this.results[key] = {
                    loading: true,
                    promise: queryMap[key].get(),
                    snapshot: null
                };
                this.results[key].unsubscribe = queryMap[key].onSnapshot(function (snapshot) {
                    _this.setState(function (prev) {
                        return ({
                            results: Object.assign({}, prev.results, (_a = {},
                                _a[key] = { snapshot: snapshot },
                                _a))
                        });
                        var _a;
                    });
                });
                this.results[key].promise.then(function (snapshot) {
                    _this.setState(function (prev) {
                        return ({
                            results: Object.assign({}, prev.results, (_a = {},
                                _a[key] = {
                                    loading: false,
                                    snapshot: snapshot
                                },
                                _a))
                        });
                        var _a;
                    });
                });
            }
            this.setState({
                results: this.results
            });
        };
        class_1.prototype.componentWillUnmount = function () {
            for (var i in this.results) {
                this.results[i].unsubscribe();
            }
        };
        class_1.prototype.render = function () {
            return React.createElement(WrappedComponent, __assign({}, this.state.results, this.props));
        };
        return class_1;
    }(React.Component));
}
export default createContainer;
//# sourceMappingURL=index.js.map

import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";
import Courses from "./Courses";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Nav auth={this.auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={(props) => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            render={(props) => <Callback auth={this.auth} {...props} />}
          />
          <PrivateRoute path="/profile" auth={this.auth} component={Profile} />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/private" auth={this.auth} component={Private} />
          <PrivateRoute
            path="/courses"
            auth={this.auth}
            component={Courses}
            scopes={["read:courses"]}
          />
        </div>
      </>
    );
  }
}

export default App;

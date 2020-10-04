import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/menu";

class App extends Component {
  render(): JSX.Element {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Menu}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

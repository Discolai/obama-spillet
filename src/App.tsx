import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/menu";
import Game from "./components/game";

class App extends Component {
  render(): JSX.Element {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Menu}></Route>
          <Route exact path="/play" component={Game}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

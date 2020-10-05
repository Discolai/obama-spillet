import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import AmericanFlag from "../../assets/american-flag.png";
import ObamaImg from "../../assets/obama.png";

class Menu extends Component<RouteComponentProps> {
  handlePlay(): void {
    this.props.history.push("/play");
  }

  componentDidMount(): void {
    new Image().src = AmericanFlag;
    new Image().src = ObamaImg;
  }

  render(): JSX.Element {
    return (
      <div>
        <div className="container wrapper">
          <div className="center">
            <h1 className="font-weight-bold display-2 text-white">
              Vokt dem for Obama
            </h1>
            <button
              onClick={() => this.handlePlay()}
              className="btn btn-american-blue"
            >
              <h2 className="font-weight-bold text-white">Spill</h2>
            </button>
            <h3 className="font-weight-bold text-white">
              Hold musepekeren unna Obama
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;

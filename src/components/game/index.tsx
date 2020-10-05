import React, { Component } from "react";
import GameCanvas from "./GameCanvas";
import ObamaImg from "../../assets/obama.png";

interface IProps {}

interface IState {
  playing: boolean;
  score: number;
}

class Game extends Component {
  state: Readonly<IState> = {
    playing: true,
    score: 0
  };

  handlePlayAgain(): void {
    this.setState({ playing: true, score: 0 });
  }

  render(): JSX.Element {
    const { playing, score } = this.state;
    return (
      <div className="h-100 mt-4">
        {playing ? (
          <GameCanvas
            className="mx-auto"
            onGameOver={(score) => this.setState({ playing: false, score })}
          />
        ) : (
          <div className="wrapper">
            <div className="center">
              <img
                className="mb-1"
                src={ObamaImg}
                width="100"
                height="auto"
                alt="obama"
              />
              <h1 className="font-weight-bold display-2 text-white">
                Spillet er over
              </h1>

              <h2 className="font-weight-bold text-american-blue mb-4">
                Antall Obamahoder før du tapte:
              </h2>
              <h2 className="font-weight-bold text-american-blue">{score}</h2>
              <button
                onClick={() => this.handlePlayAgain()}
                className="btn btn-american-blue"
              >
                <h2 className="font-weight-bold text-white">Spill igjen</h2>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Game;

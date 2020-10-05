import React, { Component } from "react";
import ObamaImg from "../../assets/obama.png";
import ObamaSong from "../../assets/obama-sangen.mp3";
import AmericanFlag from "../../assets/american-flag.png";
import Obama from "../../models/Obama";
import Rect from "../../models/Rect";
import {
  randMinMax,
  getMousePos,
  rectContains,
  setCanvasSize
} from "../../Util";

interface IProps {
  className: string;
  onGameOver: (score: number) => void;
}

interface IState {
  gameOver: boolean;
  score: number;
}

class GameCanvas extends Component<IProps, IState> {
  canvas = React.createRef<HTMLCanvasElement>();
  canvasWrapper = React.createRef<HTMLDivElement>();
  obamaImg = new Image();
  americanFlag = new Image();

  obamaSong = new Audio(ObamaSong);

  spawnInterval: number | null = null;
  updateInterval: number | null = null;
  obamas: Obama[] = [];

  currentDimension = { w: 50, h: 50 } as Rect;
  mousePos = new DOMPoint();

  state: Readonly<IState> = {
    gameOver: false,
    score: 0
  };

  componentDidMount(): void {
    const { obamas, obamaImg, americanFlag, currentDimension } = this;
    const canvas = this.canvas.current;
    const canvasWrapper = this.canvasWrapper.current;

    if (!canvas || !canvasWrapper) {
      console.error("Failed to load references");
      return;
    }

    obamaImg.src = ObamaImg;

    americanFlag.src = AmericanFlag;
    americanFlag.onload = () => this.handleStartGame();

    setCanvasSize(canvas, canvasWrapper);

    canvas.onresize = () => {
      setCanvasSize(canvas, canvasWrapper);
      this.drawObamas();
    };

    canvas.onmousemove = (e: MouseEvent) => {
      const pos = (this.mousePos = getMousePos(canvas, e));

      const hit = obamas.some((obama) => {
        const rect = new DOMRect(
          obama.pos.x,
          obama.pos.y,
          currentDimension.w,
          currentDimension.h
        );
        return rectContains(rect, pos);
      });
      if (hit) this.handleGameOver();
    };
  }

  componentWillUnmount(): void {
    this.handleGameOver();
  }

  handleStartGame = (): void => {
    console.log("start");

    const { obamaSong } = this;
    obamaSong.loop = true;
    obamaSong.play();
    this.setState({ gameOver: false, score: 0 });
    this.obamas = [];

    this.updateInterval = window.requestAnimationFrame(this.updateObama);

    this.spawnInterval = window.setInterval(this.spawnObama, 1000);
  };

  handleGameOver = (): void => {
    this.obamaSong.pause();
    this.obamaSong.currentTime = 0;
    this.setState({ gameOver: true });

    if (this.spawnInterval) window.clearInterval(this.spawnInterval);
    if (this.updateInterval) window.cancelAnimationFrame(this.updateInterval);

    this.props.onGameOver(this.state.score);
  };

  drawObamas = (): void => {
    const canvas = this.canvas.current;
    const {
      obamaImg,
      currentDimension: { w, h }
    } = this;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.obamas.forEach((obama: Obama) => {
      const { x, y } = obama.pos;
      ctx.drawImage(obamaImg, x, y, w, h);
    });
  };

  spawnObama = (): void => {
    if (!this.canvas.current) return;
    const { width, height } = this.canvas.current;
    const { w, h } = this.currentDimension;

    const x = randMinMax(w, width - w);
    const y = randMinMax(h, height - h);
    this.obamas.push(
      new Obama(
        { x, y },
        { x: Math.random() < 0.5 ? 1 : -1, y: Math.random() < 0.5 ? 1 : -1 }
      )
    );
    this.setState({ score: this.obamas.length });
  };

  updateObama = (): void => {
    if (!this.canvas.current) return;
    const { width: w, height: h } = this.canvas.current;

    this.obamas.forEach((obama: Obama) => {
      obama.move(
        { x: 0, y: 0, w, h } as Rect,
        {
          w: this.currentDimension.w,
          h: this.currentDimension.h
        } as Rect,
        2
      );
      const rect = new DOMRect(
        obama.pos.x,
        obama.pos.y,
        this.currentDimension.w,
        this.currentDimension.h
      );
      if (rectContains(rect, this.mousePos)) this.handleGameOver();
    });
    this.drawObamas();
    if (!this.state.gameOver) window.requestAnimationFrame(this.updateObama);
  };

  render(): JSX.Element {
    const { score } = this.state;
    const { className } = this.props;
    return (
      <div
        className={className}
        ref={this.canvasWrapper}
        style={{ width: "80%", height: "80%" }}
      >
        <canvas
          className="border border-white"
          ref={this.canvas}
          style={{
            backgroundImage: `url(${this.americanFlag.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></canvas>
        <div className="d-flex text-white text-bold">
          <div className="display-2 mx-auto">{score}</div>
        </div>
      </div>
    );
  }
}

export default GameCanvas;

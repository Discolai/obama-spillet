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
  paused: boolean;
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

  obamaDimensions = { w: 50, h: 50 } as Rect;
  obamaSpeed = 1;
  mousePos = new DOMPoint();

  state: Readonly<IState> = {
    gameOver: false,
    score: 0,
    paused: true
  };

  componentDidMount(): void {
    const { obamas, obamaImg, americanFlag, obamaDimensions } = this;
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
    this.updateObamaDimensions();

    canvas.onresize = () => {
      setCanvasSize(canvas, canvasWrapper);
      this.updateObamaDimensions();
    };

    canvas.onmousemove = (e: MouseEvent) => {
      const pos = (this.mousePos = getMousePos(canvas, e));

      const hit = obamas.some((obama) => {
        const rect = new DOMRect(
          obama.pos.x,
          obama.pos.y,
          obamaDimensions.w,
          obamaDimensions.h
        );
        return rectContains(rect, pos);
      });
      if (hit) this.handleGameOver();
    };

    canvas.onmouseleave = () => {
      this.pauseGame();
    };

    canvas.onmouseenter = () => {
      this.resumeGame();
    };
  }

  componentWillUnmount(): void {
    this.handleGameOver();
  }

  pauseGame = (): void => {
    this.setState({ paused: true });
    this.obamaSong.pause();
  };

  resumeGame = (): void => {
    this.setState({ paused: false });
    this.obamaSong.play();
  };

  handleStartGame = (): void => {
    console.log("start");

    const { obamaSong } = this;
    obamaSong.loop = true;
    obamaSong.currentTime = 0;
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
      obamaDimensions: { w, h }
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
    if (!this.canvas.current || this.state.paused) return;
    const { width, height } = this.canvas.current;
    const { w, h } = this.obamaDimensions;

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
    if (!this.canvas.current || this.state.paused) {
      window.requestAnimationFrame(this.updateObama);
      return;
    }

    const { width: w, height: h } = this.canvas.current;

    this.obamas.forEach((obama: Obama) => {
      obama.move(
        { x: 0, y: 0, w, h } as Rect,
        {
          w: this.obamaDimensions.w,
          h: this.obamaDimensions.h
        } as Rect,
        this.obamaSpeed
      );
      const rect = new DOMRect(
        obama.pos.x,
        obama.pos.y,
        this.obamaDimensions.w,
        this.obamaDimensions.h
      );
      if (rectContains(rect, this.mousePos)) this.handleGameOver();
    });
    this.drawObamas();
    if (!this.state.gameOver) window.requestAnimationFrame(this.updateObama);
  };

  updateObamaDimensions = (): void => {
    console.log(this.canvas.current);

    if (!this.canvas.current) return;

    const { width } = this.canvas.current;

    if (width > 3500) {
      this.obamaDimensions.w = 200;
      this.obamaDimensions.h = 256;
      this.obamaSpeed = 5;
    } else if (width > 2000) {
      this.obamaDimensions.w = 100;
      this.obamaDimensions.h = 128;
      this.obamaSpeed = 4;
    } else if (width > 1200) {
      this.obamaDimensions.w = 80;
      this.obamaDimensions.h = 102;
      this.obamaSpeed = 3;
    } else if (width > 992) {
      this.obamaDimensions.w = 60;
      this.obamaDimensions.h = 77;
      this.obamaSpeed = 3;
    } else if (width > 768) {
      this.obamaDimensions.w = 40;
      this.obamaDimensions.h = 51;
      this.obamaSpeed = 2;
    } else if (width > 576) {
      this.obamaDimensions.w = 20;
      this.obamaDimensions.h = 26;
      this.obamaSpeed = 2;
    } else {
      this.obamaDimensions.w = 10;
      this.obamaDimensions.h = 13;
      this.obamaSpeed = 2;
    }
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

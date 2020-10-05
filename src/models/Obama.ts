import Coordinate from "./Coordinate";

import Rect from "./Rect";

export default class Obama {
  pos: Coordinate;
  acc: Coordinate;

  constructor(pos: Coordinate, acc: Coordinate) {
    this.pos = pos;
    this.acc = acc;
  }

  public move(bound: Rect, dimensions: Rect, speed = 1): void {
    const x = this.pos.x + this.acc.x * speed;
    const y = this.pos.y + this.acc.y * speed;
    const { w, h } = dimensions;

    if (x < 0 || x + w > bound.x + bound.w) {
      this.acc.x = this.acc.x > 0 ? -1 : 1;
    } else this.pos.x = x;

    if (y < 0 || y + h > bound.y + bound.h) {
      this.acc.y = this.acc.y > 0 ? -1 : 1;
    } else this.pos.y = y;
  }
}

export const randMinMax = (min: number, max: number): number => {
  return Math.max(min, Math.floor(Math.random() * max));
};

export const getMousePos = (
  canvas: HTMLCanvasElement,
  evt: MouseEvent
): DOMPoint => {
  const rect = canvas.getBoundingClientRect();
  return new DOMPoint(evt.clientX - rect.left, evt.clientY - rect.top);
};

export const rectContains = (rect: DOMRect, pos: DOMPoint): boolean => {
  return (
    rect.left <= pos.x &&
    rect.right >= pos.x &&
    rect.top <= pos.y &&
    rect.bottom >= pos.y
  );
};

export const setCanvasSize = (
  canvas: HTMLCanvasElement,
  wrapper: HTMLDivElement
): void => {
  const rect = wrapper.getBoundingClientRect();
  if (rect) {
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
};

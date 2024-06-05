type DrawingCanvas = {
  ctx: CanvasRenderingContext2D;
  currentPos: Point;
  previousPos: Point | null;
};

type Point = {
  x: number;
  y: number;
};
type DrawLineProps = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

type DrawCanvasProps = {
  previousPoint: Point | null;
  currentPoint: Point;
  ctx: CanvasRenderingContext2D;
};

type Point = {
  x: number;
  y: number;
};

type DrawLineProps = {
  previousPoint: Point | null;
  currentPoint: Point;
  color: string;
};

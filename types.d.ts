type DrawingCanvas = {
  ctx: CanvasRenderingContext2D;
  currentPos: PointTypee | null;
  previousPos: PointTypee | null;
};

type PointTypee = {
  x: number;
  y: number;
};

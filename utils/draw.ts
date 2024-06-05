const drawLine = ({
  previousPoint,
  currentPoint,
  ctx,
  color,
}: DrawCanvasProps & {
  color: string;
}): void => {
  const { x: currX, y: currY } = currentPoint;
  const lineColor = color;
  const lineWidth = 5;

  let startPoint = previousPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
  ctx.fill();
};

export default drawLine;

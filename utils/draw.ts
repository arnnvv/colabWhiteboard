type DrawLineProps = DrawingCanvas & {
  color: string;
};

const drawLine = ({
  ctx,
  currentPos,
  previousPos,
  color,
}: DrawLineProps): void => {
  const { x: currentX, y: currentY } = currentPos;
  const lineWidth = 5;

  let stPt = previousPos ?? currentPos;

  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.moveTo(stPt.x, stPt.y);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(stPt.x, stPt.y, 2, 0, 2 * Math.PI);
  ctx.fill();
};

export default drawLine;

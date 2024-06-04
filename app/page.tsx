"use client";

import useDraw from "@/useDraw";
import { ChromePicker } from "react-color";

export default function Home(): JSX.Element {
  const drawLine = ({ ctx, currentPos, previousPos }: DrawingCanvas) => {
    const { x: currentX, y: currentY } = currentPos;
    const linecolour = "#000";
    const lineWidth = 5;

    let stPt = previousPos ?? currentPos;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = linecolour;
    ctx.moveTo(stPt.x, stPt.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = linecolour;
    ctx.beginPath();
    ctx.arc(stPt.x, stPt.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const { canvasRef, onMouseDown } = useDraw(drawLine);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker />
      </div>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={1000}
        height={1000}
        className="border border-black rounded-md"
      />
    </div>
  );
}

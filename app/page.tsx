"use client";

import useDraw from "@/useDraw";
import { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";

export default function Home(): JSX.Element {
  const [color, setColor] = useState<string>("#000");

  const drawLine = ({ ctx, currentPos, previousPos }: DrawingCanvas) => {
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

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker
          color={color}
          onChange={(e: ColorResult) => setColor(e.hex)}
        />
        <button
          type="button"
          className="p-2 rounded-md border border-black text-sky-300"
          onClick={clear}
        >
          Clear
        </button>
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

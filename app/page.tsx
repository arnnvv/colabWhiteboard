"use client";

import useDraw from "@/useDraw";
import drawLine from "@/utils/draw";

export default function Home(): JSX.Element {
  const color: string = "#000";

  const createLine = ({ ctx, currentPos, previousPos }: DrawingCanvas) => {
    drawLine({ ctx, currentPos, previousPos, color });
  };

  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
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

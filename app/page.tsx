"use client";

import useDraw from "@/useDraw";
import drawLine from "@/utils/draw";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

export default function Home(): JSX.Element {
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const color: string = "#000";

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    socket.on(
      "draw-line",
      ({ previousPoint, currentPoint, color }: DrawLineProps): void => {
        if (!ctx) return;
        drawLine({
          previousPoint,
          currentPoint,
          ctx,
          color,
        });
      },
    );
  }, [canvasRef]);

  function createLine({
    previousPoint,
    currentPoint,
    ctx,
  }: DrawCanvasProps): void {
    socket.emit("draw-line", {
      previousPoint,
      currentPoint,
      color,
    });
    drawLine({ previousPoint, currentPoint, ctx, color });
  }

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

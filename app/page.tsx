"use client";

import useDraw from "@/useDraw";
import drawLine from "@/utils/draw";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

export default function Home(): JSX.Element {
  const color: string = "#000";

  const createLine = ({
    previousPoint,
    currentPoint,
    ctx,
  }: DrawCanvasProps): void => {
    socket.emit("draw-line", {
      previousPoint,
      currentPoint,
      color,
    });
    drawLine({ previousPoint, currentPoint, ctx, color });
  };

  const { canvasRef, onMouseDown, clear } = useDraw(createLine);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.emit("client-ready");

    socket.on("get-canvas", () => {
      if (!canvasRef.current?.toDataURL()) return;
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });

    socket.on("canvas-state-from-server", (state: string) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

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

    socket.on("clear", clear);

    return () => {
      socket.off("draw-line");
      socket.off("clear");
      socket.off("get-canvas");
      socket.off("canvas-state-from-server");
    };
  }, [canvasRef, clear]);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <button
          type="button"
          className="p-2 rounded-md border border-black text-sky-300"
          onClick={() => socket.emit("clear")}
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

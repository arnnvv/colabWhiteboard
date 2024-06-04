import { MouseEvent, RefObject, useEffect, useRef } from "react";

const useDraw = (): RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      console.log({ x: e.clientX, y: e.clientY });
    };

    canvasRef.current?.addEventListener("mousemove", handler);

    return () => canvasRef.current?.addEventListener("mousemove", handler);
  }, []);

  return canvasRef;
};

export default useDraw;

import { MutableRefObject, useEffect, useRef, useState } from "react";

const useDraw = (
  draw: ({ ctx, currentPos, previousPos }: DrawingCanvas) => void,
): {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  onMouseDown: () => void;
  clear: () => void;
} => {
  const [mousePressed, setMousePressed] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevPt = useRef<Point | null>(null);

  const onMouseDown = () => setMousePressed(true);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect((): (() => void | undefined) => {
    const handler = (e: MouseEvent): void => {
      if (!mousePressed) return;

      const pos = fixPos(e);
      const ctx = canvasRef.current?.getContext("2d");

      if (!ctx || !pos) return;

      draw({ ctx, currentPos: pos, previousPos: prevPt.current });
      prevPt.current = pos;
    };

    const fixPos = (e: MouseEvent): Point | undefined => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };
    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", () => setMousePressed(false));

    return (): void | undefined =>
      canvasRef.current?.removeEventListener("mousemove", handler);
  }, [draw, mousePressed]);

  return { canvasRef, onMouseDown, clear };
};

export default useDraw;

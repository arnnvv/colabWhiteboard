import {
  MouseEvent,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

const useDraw = (
  draw: ({ ctx, currentPos, previousPos }: DrawingCanvas) => void,
): {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  onMouseDown: () => void;
} => {
  const [mousePressed, setMousePressed] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevPt = useRef<PointTypee | null>(null);

  const onMouseDown = () => setMousePressed(true);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const pos = fixPos(e);
      const ctx = canvasRef.current?.getContext("2d");

      if (!ctx || !pos) return;

      console.log({ x: e.clientX, y: e.clientY });
      draw({ ctx, currentPos: pos, previousPos: prevPt.current });
      prevPt.current = pos;
    };

    const fixPos = (e: MouseEvent): PointTypee | undefined => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };
    canvasRef.current?.addEventListener("mousemove", handler);

    return () => canvasRef.current?.addEventListener("mousemove", handler);
  }, []);

  return { canvasRef, onMouseDown };
};

export default useDraw;

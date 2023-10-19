import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";

interface IDimension {
  height: number;
  width: number;
}
const Board: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = useRef(false);

  const [dimension, setDimension] = useState<IDimension>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const { color, strokeWidth } = useAppSelector((state) => state.ToolBox);
  
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const changeDimension = () => {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", changeDimension);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = dimension.width;
    canvas.height = dimension.height;

    if (context === null) return;

    const handleMouseClick = (e: MouseEvent) => {
      draw.current = true;
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!draw.current) return;
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
    };
    const handleMouseLeave = (_e: MouseEvent) => {
      draw.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseClick);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", changeDimension);
      canvas.removeEventListener("mousedown", handleMouseClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseLeave);
    };
  }, [dimension]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const changeConfig = () => {
      if (context !== null) {
        context.strokeStyle = color;
        context.lineWidth = strokeWidth;
      }
    };

    changeConfig();
  }, [color, strokeWidth]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Board;
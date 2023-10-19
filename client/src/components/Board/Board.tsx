import React, { useLayoutEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";

interface IDimension {
  height: number;
  width: number;
}
const Board: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimension, setDimension] = useState<IDimension>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useLayoutEffect(() => {
    const changeDimension = () => {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", changeDimension);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.getContext("2d");
      canvas.width = dimension.width;
      canvas.height = dimension.height;
    }

    return () => {
      window.removeEventListener("resize", changeDimension);
    };
  }, [dimension]);

  // const {color} = useAppSelector((state) => state.ToolBox);
  // const {opacity} = useAppSelector((state) => state.ToolBox);
  // const {strokeWidth} = useAppSelector((state) => state.ToolBox);
  const {eraserSize} = useAppSelector((state) => state.ToolBox);
  console.log("eraser size is" , eraserSize);
  // console.log("stroke width is" , strokeWidth);
  // console.log("stroke is" , color);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Board;

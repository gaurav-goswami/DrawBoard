import React, { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
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
        window.removeEventListener("resize" , changeDimension);
    };
  }, [dimension]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Board;

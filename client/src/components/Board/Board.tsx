// import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
// import { useAppSelector } from "../../app/hooks";

// interface IDimension {
//   height: number;
//   width: number;
// }
// const Board: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const draw = useRef(false);

//   const [dimension, setDimension] = useState<IDimension>({
//     height: window.innerHeight,
//     width: window.innerWidth,
//   });

//   const { color, strokeWidth } = useAppSelector((state) => state.ToolBox);
//   const { selectedTool } = useAppSelector((state) => state.Tools);
//   console.log("selected tool" , selectedTool);

//   useLayoutEffect(() => {
//     if (!canvasRef.current) return;
//     // const changeDimension = () => {
//     //   setDimension({
//     //     height: window.innerHeight,
//     //     width: window.innerWidth,
//     //   });
//     // };
//     // window.addEventListener("resize", changeDimension);

//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     canvas.width = dimension.width;
//     canvas.height = dimension.height;

//     if (context === null) return;

//     if (selectedTool !== "Pencil") return;
//     const handleMouseClick = (e: MouseEvent) => {
//       draw.current = true;
//       context.beginPath();
//       context.moveTo(e.clientX, e.clientY);
//     };
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!draw.current) return;
//       context.lineTo(e.clientX, e.clientY);
//       context.stroke();
//     };
//     const handleMouseLeave = () => {
//       draw.current = false;
//     };

//     canvas.addEventListener("mousedown", handleMouseClick);
//     canvas.addEventListener("mousemove", handleMouseMove);
//     canvas.addEventListener("mouseup", handleMouseLeave);

//     return () => {
//       // window.removeEventListener("resize", changeDimension);
//       canvas.removeEventListener("mousedown", handleMouseClick);
//       canvas.removeEventListener("mousemove", handleMouseMove);
//       canvas.removeEventListener("mouseup", handleMouseLeave);
//     };
//   }, [selectedTool]);

//   useEffect(() => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     const changeConfig = () => {
//       if (context !== null) {
//         context.strokeStyle = color;
//         context.lineWidth = strokeWidth;
//       }
//     };

//     changeConfig();
//   }, [color, strokeWidth]);

//   return (
//     <>
//       <canvas ref={canvasRef}></canvas>
//     </>
//   );
// };

// export default Board;

import React, { useRef , useLayoutEffect, useState } from 'react';
import rough from "roughjs";
import createElement from '../../utility/createElement';
import { useAppSelector } from '../../app/hooks';

const Board : React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<boolean>(false);
  const generator = rough.generator();
  const [elements, setElements] = useState<any[]>([]);
  const {selectedTool} = useAppSelector((state) => state.Tools);

  useLayoutEffect(() => {

    if(!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas?.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height)
    const roughCanvas = rough.canvas(canvas);
    
    elements.forEach((element) => {
      roughCanvas.draw(element.element);
    })

  } , [elements]);

  const handleMouseClick : React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    drawing.current = true;
    if(!selectedTool) return;
    const {clientX, clientY} = e;

    const element = createElement(generator, clientX, clientY, clientX, clientY, selectedTool); // the starting and ending points are same because when we first click on the mouse it will initially set it to the point where the mouse currently is, and when we move the mouse with still click on the mouse it will change the end points (clientX : x2 and clientY : y2);
    // console.log("element is" , element);
    if(!element) return;
    setElements([...elements , element]);

  }

  const handleMouseMove : React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    if(!drawing.current) return;
    if(!selectedTool) return;
    const {clientX, clientY} = e;
    const index = elements.length-1;
    const {x1, y1} = elements[index];
    const element = createElement(generator, x1, y1, clientX, clientY, selectedTool);
    if(!element) return;

    const elementCopyArr = [...elements];
    elementCopyArr[index] = element;
    setElements(elementCopyArr);
  }

  const handleMouseLeave = () => {
    drawing.current = false;
  }
  

  return (
    <>
      <canvas ref = {canvasRef}
      onMouseDown={handleMouseClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseLeave}
      />
    </>
  )
}

export default Board

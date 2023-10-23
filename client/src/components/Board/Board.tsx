import React, { useRef , useLayoutEffect, useState, MouseEventHandler } from 'react';
import rough from "roughjs";
import {adjustElementCoordinates, createElement, updateElement} from '../../utility/elementFn';
import { useAppSelector } from '../../app/hooks';
import getElement, { cursorForPosition, resizedCoordinates } from '../../utility/elementPosition';

const Board : React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<boolean>(false);
  const generator = rough.generator();
  const [elements, setElements] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [action, setAction] = useState<string>("");

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
    const {clientX, clientY} = e;
    if(selectedTool === "Selection") {
    const element = getElement(clientX, clientY, elements);
      if(element){
        const offsetX = clientX - element?.x1;
        const offsetY = clientY - element?.y1;
        setSelectedElement({...element , offsetX , offsetY});

        if(element.position === "inside"){
          setAction("moving");
        }else{
          setAction("resize");
        }
      }
    }

    const id = elements.length;
    const element = createElement(id, generator, clientX, clientY, clientX, clientY, selectedTool); // the starting and ending points are same because when we first click on the mouse it will initially set it to the point where the mouse currently is, and when we move the mouse with still click on the mouse it will change the end points (clientX : x2 and clientY : y2);
    // console.log("element is" , element);
    if(!element) return;
    setElements([...elements , element]);

  }

  const handleMouseMove : MouseEventHandler<HTMLCanvasElement> = (e) => {
    if(!drawing.current) return;
    const {clientX, clientY} = e;
    
    if(selectedTool === "Selection"){
      // const element = getElement(clientX, clientY, elements);
      // e.target.style.cursor = element ? cursorForPosition(element.position) : "default";

      if(selectedElement && action === "moving"){
        const {id, x1, y1, x2, y2, elementType , offsetX, offsetY} = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        updateElement(id, generator, newX1, newY1, newX1 + width, newY1 + height, elementType, elements, setElements);
      }else if(action === "resize"){
        const {id, position ,elementType, ...coordinates} = selectedElement;
        const {x1, y1, x2, y2} = resizedCoordinates(clientX, clientY, position, coordinates)
        updateElement(id , generator, x1, y1, x2, y2, elementType, elements, setElements);
      }
    }
    
    if(selectedTool !== 'Box' && selectedTool !== "Line") return;
    if(elements.length > 0){
      const index = elements.length-1;
      const {x1, y1} = elements[index];
      updateElement(index, generator, x1, y1, clientX, clientY, selectedTool, elements, setElements);
    }
  }

  const handleMouseLeave = () => {
    if(elements.length > 0){
      const index = elements.length - 1;
      const {id, elementType} = elements[index] 
      if(drawing.current){
        const {x1, y1, x2, y2} = adjustElementCoordinates(elements[index]);
        updateElement(id, generator, x1, y1, x2, y2, elementType, elements, setElements);
      }
    }
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
import React, {
  useRef,
  useLayoutEffect,
  useState,
  MouseEventHandler,
  useEffect,
} from "react";
import rough from "roughjs";
import {
  adjustElementCoordinates,
  adjustmentRequired,
  createElement,
  drawElement,
  updateElement,
} from "../../utility/elementFn";
import { useAppSelector } from "../../app/hooks";
import getElement, { resizedCoordinates } from "../../utility/elementPosition";
import useHistory from "../../hooks/useHistory";
import getMouseCoordinates from "../../utility/mouseCoordinates";
import { BiZoomOut, BiZoomIn } from "react-icons/bi";
import { zoom } from "../../utility/zoom";

type Offset = {
  x: number;
  y: number;
};

const Board: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<boolean>(false);
  const generator = rough.generator();
  const [elements, setElements, undo, redo] = useHistory([]);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [action, setAction] = useState<string>("");
  const [panOffset, setPanOffset] = useState<Offset>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const [scaleOffset, setScaleOffset] = useState<Offset>({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = useState<any>({
    x: 0,
    y: 0,
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { selectedTool } = useAppSelector((state) => state.Tools);

  useEffect(() => {
    const undoRedo = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "y") {
        redo();
      }
    };
    document.addEventListener("keydown", undoRedo);
    return () => {
      document.removeEventListener("keydown", undoRedo);
    };
  }, [undo, redo]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing" && textArea !== null) {
      textArea.focus();
    }
  }, [action]);

  useEffect(() => {
    const panFn = (e: WheelEvent) => {
      setPanOffset((prev: any) => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }));
    };
    document.addEventListener("wheel", panFn);
    return () => {
      document.removeEventListener("wheel", panFn);
    };
  }, []);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas?.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);

    const scaledWidth = canvas.width * scale;
    const scaledHeight = canvas.height * scale;
    const scaleOffsetX = (scaledWidth - canvas.width) / 2;
    const scaleOffsetY = (scaledHeight - canvas.height) / 2;
    setScaleOffset({ x: scaleOffsetX, y: scaleOffsetY });

    context?.save();
    context?.translate(
      panOffset.x * scale - scaleOffsetX,
      panOffset.y * scale - scaleOffsetY
    );
    context?.scale(scale, scale);

    const roughCanvas = rough.canvas(canvas);

    if (elements !== undefined) {
      elements.forEach((element: any) => {
        drawElement(roughCanvas, context, element);
      });
    }
    context?.restore();
  }, [elements, panOffset, selectedElement, scale]);

  const handleMouseClick: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    drawing.current = true;
    const { clientX, clientY } = getMouseCoordinates(
      e,
      scale,
      scaleOffset,
      panOffset
    );

    if (e.button === 1) {
      setAction("panning");
      setStartPanMousePosition({ x: clientX, y: clientY });
      return;
    }

    if (selectedTool === "Selection") {
      const element = getElement(clientX, clientY, elements);
      if (element) {
        if (element.elementType === "Pencil") {
          const xOffset: any = element.points.map(
            (points: { x: number; y: number }) => clientX - points.x
          );
          const yOffset: any = element.points.map(
            (points: { x: number; y: number }) => clientY - points.y
          );
          setSelectedElement({ ...element, xOffset, yOffset });
        } else {
          const offsetX = clientX - element?.x1;
          const offsetY = clientY - element?.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        // setElements((prev : any) => prev);

        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resize");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        generator,
        clientX,
        clientY,
        clientX,
        clientY,
        selectedTool
      );
      setElements((prevState: any) => [...prevState, element]);
      setSelectedElement(element);

      setAction(selectedTool === "Text" ? "writing" : "drawing");
    }

    // const id = elements.length;
    // const element = createElement(

    // ); // the starting and ending points are same because when we first click on the mouse it will initially set it to the point where the mouse currently is, and when we move the mouse with still click on the mouse it will change the end points (clientX : x2 and clientY : y2);
    // // console.log("element is" , element);
    // if (!element) return;
    // setElements((prev : any) => [...prev, element]);

    // console.log("action is" , action);
  };

  const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!drawing.current) return;
    const { clientX, clientY } = getMouseCoordinates(
      e,
      scale,
      scaleOffset,
      panOffset
    );

    if (action === "panning") {
      const deltaX = clientX - startPanMousePosition.x;
      const deltaY = clientY - startPanMousePosition.y;
      setPanOffset((prev: any) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }

    if (selectedTool === "Selection") {
      // const element = getElement(clientX, clientY, elements);
      // e.target.style.cursor = element ? cursorForPosition(element.position) : "default";

      if (selectedElement && action === "moving") {
        if (elements.elementType === "Pencil") {
          const newPoints = selectedElement.points.map(
            (_: never, index: number) => {
              return {
                x: clientX - selectedElement.xOffset[index],
                y: clientY - selectedElement.yOffset[index],
              };
            }
          );
          const elementsCopyArr = [...elements];
          elementsCopyArr[selectedElement.id] = {
            ...elementsCopyArr[selectedElement.id],
            points: newPoints,
          };
          elementsCopyArr[selectedElement.id].points = newPoints;
          setElements(elementsCopyArr, true);
        } else {
          const { id, x1, y1, x2, y2, elementType, offsetX, offsetY } =
            selectedElement;
          const width = x2 - x1;
          const height = y2 - y1;
          const newX1 = clientX - offsetX;
          const newY1 = clientY - offsetY;
          updateElement(
            id,
            generator,
            newX1,
            newY1,
            newX1 + width,
            newY1 + height,
            elementType,
            elements,
            setElements
          );
        }
      } 
      else if (action === "resize") {
        const { id, position, elementType, ...coordinates } = selectedElement;
        const { x1, y1, x2, y2 } = resizedCoordinates(
          clientX,
          clientY,
          position,
          coordinates
        );
        updateElement(id, generator, x1, y1, x2, y2, elementType, elements, setElements);
      }
    }

    if (
      selectedTool !== "Box" &&
      selectedTool !== "Line" &&
      selectedTool !== "Pencil"
    )
      return;
    if (elements.length > 0) {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(
        index,
        generator,
        x1,
        y1,
        clientX,
        clientY,
        selectedTool,
        elements,
        setElements
      );
    }
  };

  const handleMouseLeave = (e: any) => {
    // const { clientX, clientY } = getMouseCoordinates(e , panOffset.x, panOffset.y);
    // if (selectedElement) {
    //   const index = elements.length - 1;
    //   const { id, elementType } = elements[index];
    //   if (drawing.current && adjustmentRequired(selectedTool)) {
    //     const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
    //     updateElement(
    //       id,
    //       generator,
    //       x1,
    //       y1,
    //       x2,
    //       y2,
    //       elementType,
    //       elements,
    //       setElements
    //     );
    //   }
    // }
    // if(action === "writing") return;

    // setAction("none");
    // setSelectedElement(null);
    // drawing.current = false;

    const { clientX, clientY } = getMouseCoordinates(
      e,
      scale,
      scaleOffset,
      panOffset
    );
    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }

      const index = selectedElement.id;
      const { id, elementType } = elements[index];
      if (
        (action === "drawing" || action === "resizing") &&
        adjustmentRequired(elementType)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(
          id,
          generator,
          x1,
          y1,
          x2,
          y2,
          elementType,
          elements,
          setElements
        );
      }
    }

    if (action === "writing") return;
    setAction("none");
    setSelectedElement(null);
    drawing.current = false;
  };

  return (
    <>
      {action === "writing" ? (
        <textarea
          ref={textAreaRef}
          className="fixed"
          style={{ top: selectedElement.y1, left: selectedElement.x1 }}
          autoFocus={true}
        ></textarea>
      ) : null}

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseLeave}
        // className="absolute z-1"
      />
      <div className="fixed bottom-4 left-4 dark:bg-[#262627] bg-[#e3e4eb9d] w-max flex justify-between gap-2 items-center p-1">
        <button
          className="w-max h-max px-2 dark:text-white"
          onClick={() => zoom(-0.1, setScale)}
        >
          <BiZoomOut />
        </button>
        <span
          className="dark:text-white cursor-pointer"
          onClick={() => setScale(1)}
        >
          {new Intl.NumberFormat("en-GB", { style: "percent" }).format(scale)}
        </span>
        <button
          className="w-max h-max px-2 dark:text-white"
          onClick={() => zoom(0.1, setScale)}
        >
          <BiZoomIn />
        </button>
      </div>
    </>
  );
};

export default Board;
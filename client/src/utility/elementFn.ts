import getStroke from "perfect-freehand";
import {
  IAdjustCoordinates,
  IDrawElement,
  IElement,
  IUpdateElement,
} from "../Interface";

export const createElement: IElement = (
  id,
  generator,
  x1,
  y1,
  x2,
  y2,
  elementType
) => {
  if (elementType === undefined || !elementType) return;
  // if (elementType !== "Box" && elementType !== "Line") return;

  switch (elementType) {
    case "Line":
    case "Box":
      const element =
        elementType === "Line"
          ? generator.line(x1, y1, x2, y2)
          : elementType === "Box"
          ? generator.rectangle(x1, y1, x2 - x1, y2 - y1)
          : false;
      return { id, x1, y1, x2, y2, element, elementType };

    case "Pencil":
      return { id, elementType, points: [{ x: x1, y: y1 }] };

    case "Text":
      return { id, elementType, x1, y1, text: "Hey" };

    default:
      break;
  }
};

export const updateElement: IUpdateElement = (
  id,
  generator,
  x1,
  y1,
  x2,
  y2,
  elementType,
  elements,
  setElements
) => {
  const elementCopyArr = [...elements];
  switch (elementType) {
    case "Line":
    case "Box":
      elementCopyArr[id] = createElement(
        id,
        generator,
        x1,
        y1,
        x2,
        y2,
        elementType
      );
      break;
    case "Pencil":
      elementCopyArr[id].points = [
        ...elementCopyArr[id].points,
        { x: x2, y: y2 },
      ];
      break;
    default:
      break;
  }
  setElements(elementCopyArr, true);
};

export const adjustElementCoordinates: IAdjustCoordinates = (elements) => {
  const { x1, y1, x2, y2, elementType } = elements;
  if (elementType === "Box") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else if (elementType === "Line") {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, x2: x1, y1: y2, y2: y1 };
    }
  }
};

const getSvgPathFromStroke = (stroke: any[]) => {
  if (!stroke.length) return;
  const d = stroke.reduce(
    (accumulator, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      accumulator.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return accumulator;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

export const drawElement: IDrawElement = (roughCanvas, context, element) => {
  switch (element.elementType) {
    case "Line":
    case "Box":
      roughCanvas.draw(element.element);
      break;

    case "Pencil":
      const stroke = getSvgPathFromStroke(getStroke(element.points)); //options
      context.fill(new Path2D(stroke));
      break;

    case "Text":
      context.font = "24px sans-serif";
      context.fillText(element.text, element.x1, element.y1);
      break;

    default:
      break;
  }
};

export const adjustmentRequired = (type: string | any) => {
  return ["Line", "Box"].includes(type);
};

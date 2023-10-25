import { IAdjustCoordinates, IElement, IUpdateElement } from "../Interface";

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
  if (elementType !== "Box" && elementType !== "Line") return;

  const element =
    elementType === "Line"
      ? generator.line(x1, y1, x2, y2)
      : elementType === "Box"
      ? generator.rectangle(x1, y1, x2 - x1, y2 - y1)
      : false;
  return { id, x1, y1, x2, y2, element, elementType };
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
  const updatedElement = createElement(
    id,
    generator,
    x1,
    y1,
    x2,
    y2,
    elementType
  );
  const elementCopyArr = [...elements];
  elementCopyArr[id] = updatedElement;
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

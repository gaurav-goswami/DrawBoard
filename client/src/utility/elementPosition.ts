interface IElement {
  (x: number, y: number, elements: any): boolean;
}

const distance = (a: any, b: any) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const isWithInElement: IElement = (x, y, element) => {
  const { elementType, x1, y1, x2, y2 } = element;
  if (elementType === "Box") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < 1;
  }
};

const getElement: IElement = (x, y, elements) => {
  return elements.find((element: []) => {
    return isWithInElement(x, y, element);
  });
};

export default getElement;

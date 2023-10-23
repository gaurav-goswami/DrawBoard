interface IElement {
  (x: number, y: number, elements: any): boolean | any;
}

interface INearPoint {
  (x: number, y: number, x1: number, y1: number, t: string): any;
}

interface ICursorPosition {
  (
    position : string | null
  ) : void | any
}

interface IResizedCoordinates {
  (
    clientX : number,
    clientY : number,
    position : string,
    coordinates : any
  ) : any
}

const distance = (a: any, b: any) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const nearPoint: INearPoint = (x, y, x1, y1, t) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? t : null;
};

const positionWithInElement: IElement = (x, y, element) => {
  const { elementType, x1, y1, x2, y2 } = element;
  if (elementType === "Box") {
    const topLeft = nearPoint(x, y, x1, y1, "tl");
    const topRight = nearPoint(x, y, x2, y1, "tr");
    const bottomLeft = nearPoint(x, y, x1, y2, "bl");
    const bottomRight = nearPoint(x, y, x2, y2, "br");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    return topLeft || topRight || bottomLeft || bottomRight || inside;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    const start = nearPoint(x, y, x1, y1, "start");
    const end = nearPoint(x, y, x2, y2, "end");
    const inside = Math.abs(offset) < 1 ? "inside" : null;
    return start || end || inside;
  }
};

const getElement: IElement = (x, y, elements) => {
  return elements.map((element : any) => ({...element, position : positionWithInElement(x, y, element)}))
  .find((element : any) => element.position !== null)
};

export const cursorForPosition : ICursorPosition = (position) => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize"
    case "tr":
    case "bl":
      return "nesw-resize"
    default:
      "move";
  }
}

export const resizedCoordinates : IResizedCoordinates = (clientX, clientY, position, coordinates) => {
  const {x1, y1, x2, y2} = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return {x1 : clientX, y1 : clientY, x2, y2}
    case "tr":
      return {x1, y1 : clientY, x2 : clientX, y2}
    case "bl" :
      return {x1 : clientX, y1, x2, y2 : clientY}
    case "br":
    case "end":
      return {x1, y1, x2 : clientX, y2 : clientY}
    default:
      return null
  }
}

export default getElement;

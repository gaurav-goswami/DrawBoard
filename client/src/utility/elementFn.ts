import { IElement, IUpdateElement } from "../Interface";

export const createElement : IElement = (id, generator, x1, y1, x2, y2, elementType) => {

    if(elementType === undefined || !elementType) return;
    if(elementType !== 'Box' && elementType !== "Line") return;

    const element = elementType === "Line" ? generator.line(x1, y1, x2, y2) : elementType === "Box" ? generator.rectangle(x1, y1, x2 - x1, y2 - y1) : false;
    return {id, x1, y1, x2, y2, element, elementType};
}

export const updateElement : IUpdateElement = (id, generator, x1, y1, x2, y2, elementType, elements, setElements) => {
    const updatedElement = createElement(id, generator, x1, y1, x2, y2, elementType);

    const elementCopyArr = [...elements];
    elementCopyArr[id] = updatedElement;
    setElements(elementCopyArr);
}
interface ICreateElement {
   (
    generator : any,
    x1 : number,
    y1 : number, 
    x2 : number,
    y2 : number,
    elementType : string | undefined
   ) : any
}

const createElement : ICreateElement = (generator, x1, y1, x2, y2, elementType) => {

    if(elementType === undefined || !elementType) return;

    const element = elementType === "Line" ? generator.line(x1, y1, x2, y2) : elementType === "Box" ? generator.rectangle(x1, y1, x2 - x1, y2 - y1) : false;
    return {x1, y1, x2, y2, element};
}

export default createElement;
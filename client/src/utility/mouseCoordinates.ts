const getMouseCoordinates = (event : any,  scale : number, scaleOffset : {x : number, y : number}, panOffset: {x : number, y : number}) => {
    const clientX = (event.clientX - panOffset.x * scale + scaleOffset.x) / scale;
    const clientY = (event.clientY - panOffset.y * scale + scaleOffset.y) / scale;
    return {clientX, clientY};
}

export default getMouseCoordinates;
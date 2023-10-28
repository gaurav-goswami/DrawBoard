const getMouseCoordinates = (event : any, x : number, y : number) => {
    const clientX = event.clientX - x;
    const clientY = event.clientY - y;
    return {clientX, clientY};
}

export default getMouseCoordinates;
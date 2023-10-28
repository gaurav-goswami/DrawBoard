interface IZoom {
    (
        scaleValue : number,
        setScale : any
    ) : void
}

export const zoom : IZoom = (scaleValue, setScale) => {
    setScale((prevValue : number) => Math.min(Math.max( prevValue + scaleValue , 0.1) , 20));
}
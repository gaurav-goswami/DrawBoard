import React from "react";

interface IStroke {
  color : string;
  changeStroke : (stroke : string) => void
}

const Stroke: React.FC<IStroke> = ({ color, changeStroke }) => {

  
  return (
    <>
      <div
        className={`w-5 h-5 rounded-sm cursor-pointer`}
        style={{ background: color }}
        onClick={() => changeStroke(color)}
      />
    </>
  );
};

export default Stroke;

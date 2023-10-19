import React from "react";

interface IStroke {
  color : string;
}
const NewStroke: React.FC<IStroke> = ({ color }) => {
  const style: React.CSSProperties = color
    ? { background: color }
    : { background: "#ea5adf" };
  return (
    <>
      <div
        className={`w-7 h-7 rounded-sm cursor-pointer`}
        style={style}
      />
    </>
  );
};

export default NewStroke;

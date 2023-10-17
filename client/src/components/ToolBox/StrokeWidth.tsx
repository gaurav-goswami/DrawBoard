import React from "react";

interface IStrokeWidth {
  size?: number;
}

const StrokeWidth: React.FC<IStrokeWidth> = ({ size }) => {
  return (
    <>
      <div className="w-7 h-7 rounded-md cursor-pointer flex items-center justify-center dark:bg-[#31303b] bg-[#f2f2f7]">
        <div className={`rounded-lg w-[40%] dark:bg-white bg-gray-600`} style={{ height: `${(size ?? 0) * 1.20}px`}}/>
      </div>
    </>
  );
};

export default StrokeWidth;

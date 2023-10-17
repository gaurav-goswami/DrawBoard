import React from "react";
import Stroke from "./Stroke";
import NewStroke from "./NewStroke";
import StrokeWidth from "./StrokeWidth";
import Opacity from "./Opacity";

const stroke = ["#ea5adf", "#ff8183", "#39974b", "#55a0e5", "#b65f00"];
const ToolBox: React.FC = () => {
  return (
    <>
      <div className="w-[12.5rem] h-max dark:bg-[#1e1e1e] bg-white absolute left-4 p-2 top-2 rounded-lg flex flex-col">
        {/* common for rectangle, circle, pencil */}
        <div className="dark:text-gray-400 text-gray-950 w-full h-max flex flex-col">
          <span className="text-[14px] font-assistant">Stroke</span>
          <div className="h-7 w-full flex gap-2 mt-2 items-center">
            {/* stroke */}
            {stroke.map((stroke, index) => {
              return <Stroke color={stroke} key={index} />;
            })}
            <div className="w-[.5px] h-full dark:bg-[#28272f] bg-[#c4bfc3]" />
            <NewStroke />
          </div>
        </div>

        <div className="dark:text-gray-400 text-gray-950 w-full h-max py-2 flex flex-col">
          <span className="text-[14px] font-assistant">Stroke</span>
          {/* stroke width*/}
          <div className="h-7 w-full flex gap-2 mt-2 items-center">
            <StrokeWidth size={1}/>
            <StrokeWidth size={2}/>
            <StrokeWidth size={3}/>
          </div>
        </div>

        <div className="dark:text-gray-400 text-gray-950 w-full h-max py-2 flex flex-col">
          <span className="text-[14px] font-assistant">Opacity</span>
          {/* opactiy*/}
          <div className="h-7 w-full flex gap-2 mt-2 items-center">
            <Opacity />
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolBox;

import React from "react";
import StrokeWidth from "./StrokeWidth";
import Opacity from "./Opacity";
import Stroke from "./Stroke";
import NewStroke from "./NewStroke";
import { useDispatch } from "react-redux";
import { setColor, setStrokeWidth } from "../../app/features/ToolBox";
import { useAppSelector } from "../../app/hooks";

const stroke = ["#ea5adf", "#ff8183", "#39974b", "#55a0e5", "#b65f00"];
const strokeWidth = [1, 2, 3];
const CommonTools: React.FC = () => {
  const dispatch = useDispatch();
  const currentStroke = useAppSelector((state) => state.ToolBox.color);
  const changeStroke = (stroke: string) => {
    dispatch(setColor(stroke));
  };

  const changeStrokeWidth = (strokeWidth: number) => {
    dispatch(setStrokeWidth(strokeWidth));
  };
  
  return (
    <>
      {/* common for rectangle, circle, pencil */}
      <div className="dark:text-gray-400 text-gray-950 w-full h-max flex flex-col">
        <span className="text-[14px] font-assistant">Stroke</span>
        <div className="h-7 w-full flex gap-2 mt-2 items-center">
          {/* stroke */}
          {stroke.map((stroke, index) => {
            return (
              <Stroke color={stroke} key={index} changeStroke={changeStroke} />
            );
          })}
          <div className="w-[.5px] h-full dark:bg-[#28272f] bg-[#c4bfc3]" />
          <NewStroke color={currentStroke} />
        </div>
      </div>

      <div className="dark:text-gray-400 text-gray-950 w-full h-max py-2 flex flex-col">
        <span className="text-[14px] font-assistant">Stroke</span>
        {/* stroke width*/}
        <div className="h-7 w-full flex gap-2 mt-2 items-center">
          {strokeWidth.map((width, index) => {
            return (
              <StrokeWidth
                size={width}
                changeStrokeWidth={changeStrokeWidth}
                key={index}
              />
            );
          })}
        </div>
      </div>

      <div className="dark:text-gray-400 text-gray-950 w-full h-max py-2 flex flex-col">
        <span className="text-[14px] font-assistant">Opacity</span>
        {/* opactiy*/}
        <div className="h-7 w-full flex gap-2 mt-2 items-center">
          <Opacity />
        </div>
      </div>
    </>
  );
};

export default CommonTools;

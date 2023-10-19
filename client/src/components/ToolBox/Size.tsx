import React from "react";
import { useDispatch } from "react-redux";
import { setEraserSize } from "../../app/features/ToolBox";

const Size: React.FC = () => {
  const dispatch = useDispatch();

  const changeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    dispatch(setEraserSize(value));
  };

  return (
    <>
      <input
        type="range"
        name="opacity"
        min={1}
        max={10}
        step={1}
        className="w-[95%]"
        onChange={changeSize}
      />
    </>
  );
};

export default Size;

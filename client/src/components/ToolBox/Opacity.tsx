import React from "react";
import { useDispatch } from "react-redux";
import { setOpacity } from "../../app/features/ToolBox";

const Opacity: React.FC = () => {

  const dispatch = useDispatch();

  const changeOpacity = (e : React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    console.log("type" , typeof(value));
    dispatch(setOpacity(value));
  }

  return (
    <>
      <input
        type="range"
        name="opacity"
        min={0}
        max={10}
        step={1}
        className="w-[95%]"
        onChange={changeOpacity}
      />
    </>
  );
};

export default Opacity;

import React from "react";

const Size : React.FC = () => {
  return (
    <>
      <input
        type="range"
        name="opacity"
        min={1}
        max={100}
        step={1}
        className="w-[95%]"
      />
    </>
  );
};

export default Size;

import React from "react";
interface IToolWrapper {
  children: React.ReactNode;
}

const ToolWrapper: React.FC<IToolWrapper> = ({ children }) => {
  return (
    <>
      <div className="max-w-[1900px] mx-auto relative">{children}</div>
    </>
  );
};

export default ToolWrapper;

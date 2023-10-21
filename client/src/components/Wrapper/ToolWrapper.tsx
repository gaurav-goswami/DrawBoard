import React from "react";
interface IToolWrapper {
  children: React.ReactNode;
}

const ToolWrapper: React.FC<IToolWrapper> = ({ children }) => {
  return (
    <>
      <div className="max-w-[1900px] mx-auto fixed top-0 right-0 left-0 z-10">{children}</div>
    </>
  );
};

export default ToolWrapper;

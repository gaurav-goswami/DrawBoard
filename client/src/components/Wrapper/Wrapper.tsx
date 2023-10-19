import React from "react";

interface IWrapper {
  children: React.ReactNode;
}

const Wrapper: React.FC<IWrapper> = ({ children }) => {
  return (
    <>
    <div className="bg-[#f1f0f0] dark:bg-[#171818]">{children}</div>
    </>
  );
};

export default Wrapper;

import React from "react";

interface IFormWrapper {
  children: React.ReactNode;
}

const FormWrapper: React.FC<IFormWrapper> = (props) => {
  const { children } = props;

  return (
    <>
      <div className="max-w-[1800px] mx-auto h-screen flex justify-center items-center flex-col">
        {children}
      </div>
    </>
  );
};

export default FormWrapper;

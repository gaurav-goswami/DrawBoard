import React from "react";
import { ICustomInputProps } from "../../Interface";

const CustomInput: React.FC<ICustomInputProps> = (props) => {
  const {
    name,
    type,
    onChange,
    value,
    placeholder,
    required,
    style,
    autocomplete,
    icon,
  } = props;

  return (
    <>
      <div className="relative flex">
        <input
          type={type}
          name={name}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          required={required}
          value={value}
          autoComplete={autocomplete}
          className={`${style} pr-6 pl-3 py-1.5 border border-gray-300 font-inconsolata placeholder:text-gray-400 outline-none w-full`}
        />
        {icon && (
          <span className="absolute inset-y-0 -right-1.5 pr-3 flex items-center cursor-pointer text-xl text-gray-500">
            {React.createElement(icon)}
          </span>
        )}
      </div>
    </>
  );
};

export default CustomInput;

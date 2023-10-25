import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import { BiRedo } from "react-icons/bi";
import useHistory from "../../hooks/useHistory";

const Redo: React.FC = () => {

  return (
    <>
      <Tooltip title="Redo">
        <span className="dark:text-white cursor-pointer text-lg transition-all duration-100 p-2 rounded-md dark:hover:bg-[#586168] hover:bg-[#b0baf539] text-gray-700">
          <BiRedo />
        </span>
      </Tooltip>
    </>
  );
};

export default Redo;

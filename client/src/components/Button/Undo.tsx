import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import { BiUndo } from "react-icons/bi";
import useHistory from "../../hooks/useHistory";

const Undo : React.FC = () => {

  return (
    <>
      <Tooltip title="Undo">
        <span className="dark:text-white cursor-pointer text-lg transition-all duration-100 p-2 rounded-md dark:hover:bg-[#586168] hover:bg-[#b0baf539] text-gray-700">
          <BiUndo />
        </span>
      </Tooltip>
    </>
  );
};

export default Undo;

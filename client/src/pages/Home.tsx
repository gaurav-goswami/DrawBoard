import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper/Wrapper";
import ToolBar from "../components/ToolBar/ToolBar";
import ToolWrapper from "../components/Wrapper/ToolWrapper";
import ToolBox from "../components/ToolBox/ToolBox";
import { useAppSelector } from "../app/hooks";
import Board from "../components/Board/Board";

const Home: React.FC = () => {
  const { theme } = useAppSelector((state) => state.Theme);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <>
      <Wrapper>
        <ToolBar />
        <ToolWrapper>
          <ToolBox />
        </ToolWrapper>
        <Board />
      </Wrapper>
    </>
  );
};

export default Home;

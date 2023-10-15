import React, { useEffect } from "react";
import ToolBar from "./components/ToolBar/ToolBar";
import Wrapper from "./components/Wrapper/Wrapper";
import { useAppSelector } from "./app/hooks";

const App: React.FC = () => {
  
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
      </Wrapper>
    </>
  );
};

export default App;

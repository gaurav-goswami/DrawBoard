import { useState } from "react";

const useHistory = (initialState ?: any) => {
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (action: any, overwrite: boolean = false) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index+1);
      setHistory([...updatedState, newState]);
      setIndex((prev) => prev + 1);
    }
  };

  const undo = () => {
    return index > 0 && setIndex(prevState => prevState - 1)
  };
  const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1);

  return [history[index], setState, undo, redo];
};

export default useHistory;

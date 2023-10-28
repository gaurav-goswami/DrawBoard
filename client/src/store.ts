import {configureStore} from "@reduxjs/toolkit";
import Theme from "./app/features/Theme";
import Tools from "./app/features/Tools";
import ToolBox from "./app/features/ToolBox";

const store = configureStore({
    reducer : {
        Theme,
        Tools,
        ToolBox,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
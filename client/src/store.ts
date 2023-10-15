import {configureStore} from "@reduxjs/toolkit";
import Theme from "./app/features/Theme";

const store = configureStore({
    reducer : {
        Theme
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
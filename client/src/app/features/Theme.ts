import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    theme : localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
}
export const themeSlice = createSlice({
    name : "themeSlice",
    initialState,
    reducers : {
        setTheme : (state, action : PayloadAction<string | null>) => {
            state.theme = action.payload
        }
    }
})

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
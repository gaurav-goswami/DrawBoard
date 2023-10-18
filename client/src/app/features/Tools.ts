import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  currentTool: null | string;
}
const initialState: InitialState = {
  currentTool: null,
};
export const toolTypeSlice = createSlice({
  name: "toolTypeSlice",
  initialState,
  reducers: {
    setCurrentToolType: (state, action: PayloadAction<string | null>) => {
      state.currentTool = action.payload;
    },
  },
});

export const { setCurrentToolType } = toolTypeSlice.actions;
export default toolTypeSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  currentTool: null | string;
  selectedTool : undefined | string;
}
const initialState: InitialState = {
  currentTool: null,
  selectedTool : undefined,
};
export const toolTypeSlice = createSlice({
  name: "toolTypeSlice",
  initialState,
  reducers: {
    setCurrentToolType: (state, action: PayloadAction<string | null>) => {
      state.currentTool = action.payload;
    },
    setSelectedTool : (state, action : PayloadAction<string | undefined>) => {
      state.selectedTool = action.payload;
    }
  },
});

export const { setCurrentToolType, setSelectedTool } = toolTypeSlice.actions;
export default toolTypeSlice.reducer;

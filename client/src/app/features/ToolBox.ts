import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  color: string;
  strokeWidth: number;
  opacity : string;
  eraserSize : string;
}
const initialState: InitialState = {
  color: "#000",
  strokeWidth: 1,
  opacity : "10",
  eraserSize: "5",
};
export const toolBoxSlice = createSlice({
  name: "toolBoxSlice",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setStrokeWidth: (state, action: PayloadAction<number>) => {
      state.strokeWidth = action.payload;
    },
    setOpacity: (state, action: PayloadAction<string>) => {
      state.opacity = action.payload;
    },
    setEraserSize: (state, action: PayloadAction<string>) => {
      state.eraserSize = action.payload;
    },
  },
});

export const { setColor, setStrokeWidth, setOpacity, setEraserSize } =
  toolBoxSlice.actions;
export default toolBoxSlice.reducer;

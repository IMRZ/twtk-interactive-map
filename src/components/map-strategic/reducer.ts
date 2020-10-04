import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  selectedRegion: null as any,
};

const strategicSlice = createSlice({
  name: 'strategic',
  initialState,
  reducers: {
    regionSelected: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
    },
  },
});

export const { regionSelected } = strategicSlice.actions;

export default strategicSlice.reducer;

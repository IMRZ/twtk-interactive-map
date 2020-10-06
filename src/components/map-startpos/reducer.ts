import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  selectedCampaign: null as string | null,
  selectedStartpos: null as string | null,
};

const startposSlice = createSlice({
  name: 'startpos',
  initialState,
  reducers: {
    startposSelected: (state, action: PayloadAction<[string, string]>) => {
      const [campaign, startpos] = action.payload;
      state.selectedCampaign = campaign;
      state.selectedStartpos = startpos;
    },
  },
});

export const { startposSelected } = startposSlice.actions;

export default startposSlice.reducer;

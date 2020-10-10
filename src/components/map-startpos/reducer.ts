import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StartposState = {
  selectedCampaign: string | null;
  selectedStartpos: string | null;
}

const initialState: StartposState = {
  selectedCampaign: null,
  selectedStartpos: null,
};

const startposSlice = createSlice({
  name: 'startpos',
  initialState,
  reducers: {
    startposSelected: (state, action: PayloadAction<[string, string]>) => {
      const [campaign, startpos] = action.payload;

      if (state.selectedCampaign === campaign && state.selectedStartpos === startpos) {
        state.selectedCampaign = null;
        state.selectedStartpos = null;
      } else {
        state.selectedCampaign = campaign;
        state.selectedStartpos = startpos;
      }
    },
  },
});

export const { startposSelected } = startposSlice.actions;

export default startposSlice.reducer;

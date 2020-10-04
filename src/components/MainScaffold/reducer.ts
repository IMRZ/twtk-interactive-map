import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  appDrawerOpen: true,
  mobileDrawerOpen: false,
};

const scaffoldSlice = createSlice({
  name: 'scaffold',
  initialState,
  reducers: {
    appDrawerOpenToggled: (state, action: PayloadAction<boolean>) => {
      state.appDrawerOpen = action.payload;
    },
    mobileDrawerOpenToggled: (state, action: PayloadAction<boolean>) => {
      state.mobileDrawerOpen = action.payload;
    },
  },
});

export const { appDrawerOpenToggled, mobileDrawerOpenToggled } = scaffoldSlice.actions;

export default scaffoldSlice.reducer;

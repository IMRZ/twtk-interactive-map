import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  drawerOpen: true,
};

const scaffoldSlice = createSlice({
  name: 'scaffold',
  initialState,
  reducers: {
    drawerOpenChanged: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const { drawerOpenChanged } = scaffoldSlice.actions;

export default scaffoldSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MapOverlay = {
  key: string;
  visible: boolean;
  count: number;
};

const initialState = {
  zoom: 'mid',
  overlays: {} as Record<any, MapOverlay>,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    overlayCreated: (state, action: PayloadAction<[string, number]>) => {
      const [key, count = 1] = action.payload;
      state.overlays[key] = { key, visible: true, count };
    },
    overlayChanged: (state, action: PayloadAction<[string, boolean]>) => {
      const [key, visible] = action.payload;
      state.overlays[key].visible = visible;
    },
    zoomChanged: (state, action: PayloadAction<string>) => {
      state.zoom = action.payload;
    },
  },
});

export const { overlayCreated, overlayChanged, zoomChanged } = mapSlice.actions;

export default mapSlice.reducer;

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
    overlayCreated: (state, action: PayloadAction<[string, boolean, number]>) => {
      const [key, visible = true, count = 1] = action.payload;
      state.overlays[key] = { key, visible, count };
    },
    overlayChanged: (state, action: PayloadAction<[string, boolean]>) => {
      const [key, visible] = action.payload;
      state.overlays[key].visible = visible;
    },
    overlaySelected: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      Object.keys(state.overlays).forEach((overlayKey) => {
        state.overlays[overlayKey].visible = key === overlayKey;
      });
    },
    reset: () => initialState,
    zoomChanged: (state, action: PayloadAction<string>) => {
      state.zoom = action.payload;
    },
  },
});

export const { overlayCreated, overlayChanged, overlaySelected, reset, zoomChanged } = mapSlice.actions;

export default mapSlice.reducer;

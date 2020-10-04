import { useState, useReducer, useEffect } from 'react';
import { createSlice } from '@reduxjs/toolkit';

const cache = {} as any; // shitty cache, good enough for now...

const initialState = {
  progress: [] as number[],
};

const slice = createSlice({
  name: 'preloader',
  initialState,
  reducers: {
    updateProgress(state, action) {
      const [index, value] = action.payload;
      state.progress[index] = value;
    }
  }
});

export function usePreloader(assets: string[]) {
  const [state, dispatch] = useReducer(slice.reducer, initialState);
  const [loaded, setLoaded] = useState(false);

  const updateProgress = (index: number, value: number) => {
    const payload = [index, value];
    dispatch(slice.actions.updateProgress(payload));
  };

  useEffect(() => {
    if (cache[assets.toString()]) {
      setLoaded(true);
      return;
    };

    const promises = assets.map((asset, index) => {
      return loadImage(
        asset,
        (e) => updateProgress(index, Math.round((e.loaded / e.total) * 100)),
      );
    });

    Promise.all(promises).then(() => {
      // wait just a bit for smoother animation...
      setTimeout(() => setLoaded(true), 800);
      cache[assets.toString()] = true;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loaded,
    progress: Math.round(state.progress.reduce((a, b) => a + b, 0) / assets.length),
  }
}

function loadImage(path: string, onprogress: (e: any) => void) {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.responseType = 'blob';
    request.onprogress = onprogress;
    request.onload = () => resolve();
    request.send();
  });
}

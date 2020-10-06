import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import mapReducer from '../components/map/reducer';
import scaffoldReducer from '../components/MainScaffold/reducer';
import strategicReducer from '../components/map-strategic/reducer';
import startposReducer from '../components/map-startpos/reducer';

const rootReducer = combineReducers({
  map: mapReducer,
  scaffold: scaffoldReducer,
  strategic: strategicReducer,
  startpos: startposReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

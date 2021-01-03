import map from './map';
import scaffold from './scaffold';
import strategic from './strategic';
import startpos from './startpos';
import painter from './painter';

export const storeModel = {
  map,
  scaffold,
  strategic,
  startpos,
  painter,
};

export type StoreModel = typeof storeModel;

export default storeModel;


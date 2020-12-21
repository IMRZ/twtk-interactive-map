import map from './map';
import scaffold from './scaffold';
import strategic from './strategic';
import startpos from './startpos';

export const storeModel = {
  map,
  scaffold,
  strategic,
  startpos,
};

export type StoreModel = typeof storeModel;

export default storeModel;


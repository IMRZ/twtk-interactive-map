import { Action, action } from 'easy-peasy';

interface StrategicModel {
  region: string | null;
  selectRegion: Action<StrategicModel, string>;
}

const strategic: StrategicModel = {
  region: null,
  selectRegion: action((state, payload) => {
    state.region = payload;
  }),
};

export default strategic;

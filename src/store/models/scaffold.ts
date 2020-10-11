import { Action, action } from 'easy-peasy';

interface ScaffoldModel {
  appDrawerOpen: boolean;
  mobileDrawerOpen: boolean;
  setAppDrawerOpen: Action<ScaffoldModel, boolean>;
  setMobileDrawerOpen: Action<ScaffoldModel, boolean>;
}

const scaffold: ScaffoldModel = {
  appDrawerOpen: true,
  mobileDrawerOpen: false,
  setAppDrawerOpen: action((state, payload) => {
    state.appDrawerOpen = payload;
  }),
  setMobileDrawerOpen: action((state, payload) => {
    state.mobileDrawerOpen = payload;
  }),
};

export default scaffold;

import { Action, action } from 'easy-peasy';

interface ScaffoldModel {
  appDrawerOpen: boolean;
  mobileDrawerOpen: boolean;
  setAppDrawerOpen: Action<ScaffoldModel, boolean>;
  setMobileDrawerOpen: Action<ScaffoldModel, boolean>;

  tooltip: React.ReactElement | null;
  setTooltip: Action<ScaffoldModel, React.ReactElement | null>;
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

  tooltip: null,
  setTooltip: action((state, payload) => {
    state.tooltip = payload;
  }),
};

export default scaffold;

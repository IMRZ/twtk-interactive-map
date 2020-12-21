import { Action, action, ActionOn, actionOn } from 'easy-peasy';
import { StoreModel } from './index';

interface StartposModel {
  campaign?: string;
  startpos?: string;

  selectStartpos: Action<StartposModel, [string, string]>;

  onCampaignSelected: ActionOn<StartposModel, StoreModel>;
}

const startpos: StartposModel = {
  campaign: undefined,
  startpos: undefined,

  selectStartpos: action((state, payload) => {
    const [campaign, startpos] = payload;
    state.campaign = campaign;
    state.startpos = startpos;
  }),

  onCampaignSelected: actionOn(
    (actions, storeActions) => storeActions.map.selectOverlay,
    (state, target) => {
      state.campaign = undefined;
      state.startpos = undefined;
    },
  )
}

export default startpos;

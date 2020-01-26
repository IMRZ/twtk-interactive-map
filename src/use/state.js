import { reactive, toRefs } from '@vue/composition-api';

export const MODE = {
  STRATEGIC: 'strategic',
  PAINTER: 'painter',
  START_POS: 'start_pos'
};

const state = reactive({
  mode: MODE.STRATEGIC,

  // painter
  selectedFaction: null,

  // startpos
  selectedStartpos: null,
});

export function useState() {
  return toRefs(state);
}

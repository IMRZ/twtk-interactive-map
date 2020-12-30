import { Action, action } from 'easy-peasy';

import preset from '../../data/painter/presets/3k_dlc05_start_pos.json';

interface PainterModel {
  selectedFaction: any | null;
  setSelectedFaction: Action<PainterModel, object | null>;
  paintRegion: Action<PainterModel, string>;

  ownership: Record<string, string>;
  factions: Record<string, any>;
  importedFactions: any[];
  setOwnership: Action<PainterModel, any>;
}

const painter: PainterModel = {
  selectedFaction: null,
  setSelectedFaction: action((state, payload) => {
    state.selectedFaction = payload;
  }),
  paintRegion: action((state, payload) => {
    state.ownership[payload] = state.selectedFaction?.key ?? null;
  }),

  ownership: preset as any,
  factions: {},
  importedFactions: [],

  setOwnership: action((state, payload) => {
    Object.entries(payload).forEach(([regionKey, factionKey]: [string, any]) => {
      const isValidRegion = state.ownership[regionKey] !== undefined;
      const isNotExistingFaction = factionKey !== null && state.factions[factionKey] === undefined;

      if (isValidRegion) {
        state.ownership[regionKey] = factionKey;

        if (isNotExistingFaction) {
          const importedFaction = {
            key: factionKey,
            name: factionKey,
            color: '#000000',
            group: 'Imported',
          };

          state.importedFactions.push(importedFaction.key);
          state.factions[importedFaction.key] = importedFaction;
        }
      }
    });
  }),
};

export default painter;

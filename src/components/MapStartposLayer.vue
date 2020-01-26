<template>
  <svg class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" version="1.1">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="style(region)"
    />
  </svg>
</template>

<script>
import { computed } from '@vue/composition-api';
import { useState } from '@/use/state';

import factions from '@/data/common/factions.json';

export default {
  props: {
    viewBox: String,
    regions: Array,
    startingPositions: Array,
    startingRegions: Object
  },
  setup(props) {
    const { selectedStartpos } = useState();
    selectedStartpos.value = null; // reset

    // default faction colour when no startpos selected
    const playableFactions = props.startingPositions.map(entry => entry.faction);
    const factionRegions = Object.assign({}, props.startingRegions);
    Object.keys(factionRegions).forEach((key) => {
      const isPlayableFaction = playableFactions.includes(factionRegions[key]);
      factionRegions[key] = isPlayableFaction ? factionRegions[key] : null;
    });

    // relationship colour when startpos selected
    const relationshipFactions = computed(() => {
      if (selectedStartpos.value) {
        const visibleFactions = selectedStartpos.value.relationships.map(entry => entry.faction);
        const result = Object.assign({}, props.startingRegions);
        Object.keys(result).forEach((key) => {
          const isVisibleFaction = visibleFactions.includes(result[key]);
          result[key] = isVisibleFaction ? selectedStartpos.value.relationships.find(entry => entry.faction === result[key]).color : null;
        });
        return result;
      }
    });

    return {
      style: (region) => {
        if (selectedStartpos.value) {
          const color = relationshipFactions.value[region.key];
          return color ? { fill: color } : null;
        } else {
          const owner = factionRegions[region.key];
          const faction = factions[owner];
          return faction ? { fill: `${faction.primaryColour}` } : null;
        }
      },

      playableFactions
    };
  }
};
</script>

<style lang="scss" scoped>
.region {
  fill: transparent;
  fill-opacity: 0.5;

  &:hover {
    stroke: black;
    stroke-width: 1;
    fill-opacity: 0.6;
  }
}
</style>

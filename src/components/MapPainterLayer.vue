<template>
  <svg class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" version="1.1">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"

      v-on="painterTooltip(region)"
      :style="style(region)"
      @click="paintRegion(region)"
    />
  </svg>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/composition-api';
import { useState } from '@/use/state';
import { useTooltip } from '@/use/tooltip';

import factions from '@/data/common/factions.json';
import starting_regions from '@/data/starting_regions.json';

export default {
  props: {
    viewBox: String,
    regions: Array,
    regionStyle: Function
  },
  setup() {
    const state = reactive({
      ownedRegions: Object.assign({}, starting_regions)
    });

    const { createTooltip } = useTooltip();
    const painterTooltip = (region) => {
      const faction = computed(() => state.ownedRegions[region.key]);
      return createTooltip('painter', faction);
    };

    const { selectedFaction } = useState();
    selectedFaction.value = null; // reset

    return {
      ...toRefs(state),

      painterTooltip,

      style: (region) => {
        const owner = state.ownedRegions[region.key];
        const faction = factions[owner];
        return faction ? { fill: `${faction.primaryColour}` } : null;
      },
      paintRegion: (region) => {
        if (selectedFaction.value) {
          state.ownedRegions[region.key] = selectedFaction.value.key;
        } else {
          state.ownedRegions[region.key] = null;
        }
      }
    }
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

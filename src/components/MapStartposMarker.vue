<template>
  <div
    class="marker leaflet-zoom-animated leaflet-interactive"
    v-on="tooltip"
    @click="selectStartpos"
  >
    <img class="character" :src="characters[startpos.icon]" />
  </div>
</template>

<script>
import { useState } from '@/use/state';
import { useTooltip } from '@/use/tooltip';

import characters from '@/assets/characters';
import factions from '@/data/common/factions';

export default {
  props: {
    startpos: Object
  },
  setup(props) {
    const { selectedStartpos } = useState();

    const { createTooltip } = useTooltip();
    const tooltip = createTooltip('startpos', { faction: factions[props.startpos.faction] });

    return {
      tooltip,

      selectStartpos: () => selectedStartpos.value = props.startpos,

      characters
    };
  }
};
</script>

<style lang="scss" scoped>
.marker {
  position: fixed;
  width: 50px;
  height: 60px;
  margin-left: -25px;
  margin-top: -60px;

  background-size: contain;
  background-image: url("~@/assets/ui/skins/default/ph_armyid_base.png");

  display: flex;
  align-items: center;
  justify-content: center;
}

.character {
  pointer-events: none;
  flex-shrink: 0;
  margin-top: -40px;
  transform: scale(0.75);
}
</style>

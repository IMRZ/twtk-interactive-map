<template>
  <div id="control">

    <div class="paint-options" v-if="mode === MODE.PAINTER">
      <pre style="margin: 0;">Select a faction:</pre>
      <select v-model="selectedFaction">
        <option v-bind:value="null">Abandoned</option>
        <option :key="faction.key"  v-for="faction in factionList" v-bind:value="faction">{{faction.name}}</option>
      </select>
    </div>
    <div class="fill" v-else></div>

    <div class="mode-select">
      <button :class="{ active: mode === MODE.STRATEGIC }" @click="mode = MODE.STRATEGIC;">strategic map</button>
      <button :class="{ active: mode === MODE.PAINTER }" @click="mode = MODE.PAINTER;">campaign planner</button>
      <button disabled :class="{ active: mode === MODE.START_POS }" @click="mode = MODE.START_POS;">starting positions</button>
    </div>
  </div>
</template>

<script>
import { useState, MODE } from '@/use/state';

import factions from '@/data/common/factions';

export default {
  setup() {
    const { mode, selectedFaction } = useState();

    const factionList = Object.values(factions)
      .filter(f => f.primaryColour !== '000000' && !f.name.startsWith('{{'))
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

    return {
      mode,
      selectedFaction,
      MODE,

      factionList
    }
  }
};
</script>

<style lang="scss" scoped>
#control {
  border-top: solid 3px black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-device-width: 600px) {
  #control {
    flex-direction: column;
  }

  .paint-options {
    flex-direction: column;
  }
}

.paint-options {
  padding: 10px 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fill {
  flex: 1;
}

.mode-select {
  padding: 10px 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  font-weight: bold;
}
</style>

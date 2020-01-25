<template>
  <pre class="faction">{{factionName}}</pre>
</template>

<script>
import { computed } from '@vue/composition-api';

import factions from '@/data/common/factions';

export default {
  props: {
    tooltip: Object
  },
  setup(props) {
    const factionName = computed(() => {
      const factionKey = props.tooltip.value;
      if (factionKey) {
        return factions[factionKey].name;
      } else {
        return 'Abanoned';
      }
    });

    return {
      factionName
    };
  }
};
</script>

<style lang="scss" scoped>
.faction {
  margin: 10px;
}
</style>

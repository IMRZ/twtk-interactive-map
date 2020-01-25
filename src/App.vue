<template>
  <div id="app" v-on="eventListeners">
    <Map />

    <GlobalTooltip
      :tooltip="tooltip"
      :mouseEvent="mouseEvent"
    />

    <BottomControl />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { useTooltip } from '@/use/tooltip';

import Map from '@/components/Map.vue';
import GlobalTooltip from '@/components/GlobalTooltip.vue';
import BottomControl from '@/components/BottomControl.vue';

export default {
  components: {
    Map,
    GlobalTooltip,
    BottomControl
  },
  setup() {
    const { tooltip } = useTooltip();

    const mouseEvent = ref(null);
    const eventListeners = {
      mousemove: (e) => mouseEvent.value = e,
      mouseleave: () => mouseEvent.value = null
    };

    return {
      tooltip,
      mouseEvent,
      eventListeners
    };
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(239, 233, 207, 1);
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  height: 100%;
}

#app {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

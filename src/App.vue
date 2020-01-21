<template>
  <div id="app" v-on="eventListeners">
    <Map />
    <GlobalTooltip
      :tooltip="tooltip"
      :mouseEvent="mouseEvent"
    />

    <pre class="version">3k_main_map v1.4.0</pre>
    <a class="repo" href="https://github.com/IMRZ/twtk-interactive-map" target="_blank" rel="noopener noreferrer">
      <img src="GitHub-Mark-32px.png" width="16px" height="16px">
    </a>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
import { useTooltip } from "@/use/tooltip";

import Map from "@/components/Map.vue";
import GlobalTooltip from "@/components/GlobalTooltip.vue";

export default {
  components: {
    Map,
    GlobalTooltip
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
}

.version {
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0.5;
  pointer-events: none;
  margin: 0;
}

.repo {
  position: absolute;
  bottom: 5px;
  left: 5px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}
</style>

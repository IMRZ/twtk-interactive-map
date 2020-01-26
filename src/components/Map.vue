<template>
  <div id="map">
    <MapContainer :path="objectUrl" v-if="objectUrl && mode === MODE.STRATEGIC" />
    <MapPainter  :path="objectUrl" v-if="objectUrl && mode === MODE.PAINTER" />
    <MapStartpos  :path="objectUrl" v-if="objectUrl && mode === MODE.START_POS" />

    <div id="loader" v-if="!objectUrl">
      <img src="favicon.ico" width="256" height="256" />
      <progress id="progress" max="100" :value="progress">{{progress}}%</progress>
    </div>

    <a class="repo" href="https://github.com/IMRZ/twtk-interactive-map" target="_blank" rel="noopener noreferrer">
      <img src="GitHub-Mark-32px.png" width="16px" height="16px">
    </a>
    <pre class="version">3k_main_map v1.4.0</pre>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from '@vue/composition-api';
import { useState, MODE } from '@/use/state';
import { loadImage } from '@/util';

import MapContainer from '@/components/MapContainer.vue';
import MapPainter from '@/components/MapPainter.vue';
import MapStartpos from '@/components/MapStartpos.vue';

const MAP_PATH = require('@/data/campaign_map_multiplayer.png');

export default {
  components: {
    MapContainer,
    MapPainter,
    MapStartpos
  },
  props: {
    painter: Boolean
  },
  setup() {
    const state = reactive({
      objectUrl: null,
      progress: 0,
    });

    onMounted(() => {
      loadImage(
        MAP_PATH,
        (e) => state.progress = Math.round((e.loaded / e.total) * 100),
        (objectUrl) => state.objectUrl = objectUrl
      );
    });

    const { mode } = useState();

    return {
      ...toRefs(state),
      mode,
      MODE
    };
  }
};
</script>

<style lang="scss" scoped>
#map {
  position: relative;
  height: 100%;
  width: 100%;
}

#loader {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
}

#progress {
  margin: 20px;
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

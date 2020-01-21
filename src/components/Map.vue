<template>
  <div id="map">
    <MapContainer :path="objectUrl" v-if="objectUrl" />
    <div id="loader" v-else>
      <img src="favicon.ico" width="256" height="256" />
      <progress id="progress" max="100" :value="progress">{{progress}}%</progress>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "@vue/composition-api";
import { loadImage } from "@/util";

import MapContainer from "@/components/MapContainer.vue";

const MAP_PATH = require('@/data/campaign_map_multiplayer.png');

export default {
  components: {
    MapContainer
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

    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped>
#map {
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
</style>

<template>
  <div style="opacity: 0;" ref="map" class="map">
    <div style="display: none;">
      <!-- layers & markers -->

      <MapPainterLayer
        ref="paintLayer"
        viewBox="0 0 3840 3024"
        :regions="regions"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api';
import { useLeaflet, createImageLayer, createSvgLayer } from '@/use/leaflet';
import { fadeIn } from '@/use/gsap';

import MapPainterLayer from '@/components/MapPainterLayer';

import regions from '@/data/regions.json';

export default {
  components: {
    MapPainterLayer
  },
  props: {
    path: String
  },
  setup(props) {
    const refs = reactive({
      map: null,
      paintLayer: null,
    });

    const bounds = [[0, 0], [3024, 3840]];

    const { zoomLevel } = useLeaflet({
      bounds: bounds,
      controlEnabled: false,
      refs: refs,
      initImageLayer: () => {
        const imageLayer = createImageLayer(props.path, bounds);
        // animate mapContainer on load
        imageLayer.on('load', () => fadeIn(refs.map, 2));
        return imageLayer;
      },
      initLayers: () => ({
        '_paint': createSvgLayer(refs.paintLayer.$el, bounds)
      }),
      initOverlays: () => ({}),
      onReady() {}
    });

    return {
      ...toRefs(refs),
      zoomLevel,

      regions
    };
  }
};
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(239, 233, 207, 1);
}
</style>

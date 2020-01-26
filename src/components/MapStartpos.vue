<template>
  <div style="opacity: 0;" ref="map" class="map">
    <div style="display: none;">
      <!-- layers & markers -->
      <div ref="markers">
        <MapStartposMarker
          v-for="startpos in starting_positions"
          :key="startpos.key"
          :startpos="startpos"
        />
      </div>

      <MapStartposLayer
        ref="factionRelationshipLayer"
        viewBox="0 0 3840 3024"
        :regions="regions"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api';
import { useLeaflet, createImageLayer, createSvgLayer, createMarkerLayer } from '@/use/leaflet';
import { fadeIn } from '@/use/gsap';

import MapStartposLayer from '@/components/MapStartposLayer';
import MapStartposMarker from '@/components/MapStartposMarker.vue';

import starting_positions from '@/data/starting_positions.json';
import regions from '@/data/regions.json';

export default {
  components: {
    MapStartposLayer,
    MapStartposMarker
  },
  props: {
    path: String
  },
  setup(props) {
    const refs = reactive({
      map: null,
      markers: null,
      factionRelationshipLayer: null
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
        '_TODO': createSvgLayer(refs.factionRelationshipLayer.$el, bounds),
      }),
      initOverlays: () => ({
        'Markers': createMarkerLayer(starting_positions, refs.markers.children, (data) => data.pin)
      }),
      onReady() {}
    });

    return {
      ...toRefs(refs),
      zoomLevel,

      starting_positions,
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

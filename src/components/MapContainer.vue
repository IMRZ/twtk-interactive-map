<template>
  <div style="opacity: 0;" ref="map" class="map">
    <div style="display: none;">
      <div ref="markers">
        <MapMarkerIcon
          v-for="region in regions"
          :key="region.key"
          :region="region"
          :zoomLevel="zoomLevel"
        />
      </div>

      <svg ref="transparentLayer" class="leaflet-interactive transparent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3840 3024" version="1.1">
        <path
          v-for="region in regions"
          :key="region.key"
          :d="region.d"
          class="region"
        />
      </svg>

      <svg ref="regionsLayer" class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3840 3024" version="1.1">
        <path
          v-for="region in regions"
          :key="region.key"
          :d="region.d"
          class="region"
          :style="{ fill: region.fill }"
        />
      </svg>

      <svg ref="provincesLayer" class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3840 3024" version="1.1">
        <path
          v-for="region in regions"
          :key="region.key"
          :d="region.d"
          class="region"
          :style="{ fill: region.province.fill }"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api';
import { useLeaflet, createImageLayer, createSvgLayer, createMarkerLayer } from '@/use/leaflet';
import { fadeIn } from '@/use/gsap';

import MapMarkerIcon from '@/components/MapMarkerIcon.vue';

import regions from '@/data/regions.json';

export default {
  components: {
    MapMarkerIcon
  },
  props: {
    path: String
  },
  setup(props) {
    const refs = reactive({
      map: null,
      markers: null,
      transparentLayer: null,
      regionsLayer: null,
      provincesLayer: null
    });

    const bounds = [[0, 0], [3024, 3840]];

    const { getMap, zoomLevel } = useLeaflet({
      bounds: bounds,
      refs: refs,
      initImageLayer: () => {
        const imageLayer = createImageLayer(props.path, bounds);
        imageLayer.on('load', () => fadeIn(refs.map, 2)); // animate mapContainer on load
        return imageLayer;
      },
      initLayers: () => ({
        'None': createSvgLayer(refs.transparentLayer, bounds),
        'Regions': createSvgLayer(refs.regionsLayer, bounds),
        'Provinces': createSvgLayer(refs.provincesLayer, bounds)
      }),
      initOverlays: () => ({
        'Resources': createMarkerLayer(regions, refs.markers.children, (data) => data.settlement)
      }),
      onReady() {
        watch( zoomLevel, () => fadeIn(getMap()._panes.markerPane, 0.5), { lazy: true }); // animate markers on zoom
      }
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

.region {
  fill: transparent;
  fill-opacity: 0.5;

  &:hover {
    stroke: black;
    stroke-width: 1;
    fill-opacity: 0.6;
  }

  .transparent &:hover {
    stroke: black;
    stroke-width: 1;
    fill-opacity: 0.2;
    fill: grey;
  }
}
</style>

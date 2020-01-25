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

      <MapLayerRegions
        ref="transparentLayer"
        viewBox="0 0 3840 3024"
        :regions="regions"
        class="transparent"
      />

      <MapLayerRegions
        ref="regionsLayer"
        viewBox="0 0 3840 3024"
        :regions="regions"
        :regionStyle="(r) => ({ fill: r.fill })"
      />

      <MapLayerRegions
        ref="provincesLayer"
        viewBox="0 0 3840 3024"
        :regions="regions"
        :regionStyle="(r) => ({ fill: r.province.fill })"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api';
import { useLeaflet, createImageLayer, createSvgLayer, createMarkerLayer } from '@/use/leaflet';
import { fadeIn } from '@/use/gsap';

import MapLayerRegions from '@/components/MapLayerRegions.vue';
import MapMarkerIcon from '@/components/MapMarkerIcon.vue';

import regions from '@/data/regions.json';

export default {
  components: {
    MapLayerRegions,
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
      controlEnabled: true,
      refs: refs,
      initImageLayer: () => {
        const imageLayer = createImageLayer(props.path, bounds);
        // animate mapContainer on load
        imageLayer.on('load', () => fadeIn(refs.map, 2));
        return imageLayer;
      },
      initLayers: () => ({
        'None': createSvgLayer(refs.transparentLayer.$el, bounds),
        'Regions': createSvgLayer(refs.regionsLayer.$el, bounds),
        'Provinces': createSvgLayer(refs.provincesLayer.$el, bounds)
      }),
      initOverlays: () => ({
        'Resources': createMarkerLayer(regions, refs.markers.children, (data) => data.settlement)
      }),
      onReady() {
        // animate markers on zoom
        watch( zoomLevel, (newZoomLevel, oldZoomLevel) => {
          const transitionHighToMid = newZoomLevel === 'med' && oldZoomLevel === 'high';
          const transitionMidToHidh = newZoomLevel === 'high' && oldZoomLevel === 'med';
          if (transitionHighToMid || transitionMidToHidh) fadeIn(getMap()._panes.markerPane, 0.5);
        }, { lazy: true });
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
</style>

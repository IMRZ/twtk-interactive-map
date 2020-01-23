<template>
  <div style="opacity: 0;" ref="mapRef" class="map">
    <div ref="markersRef" id="markers">
      <MapMarkerIcon
        v-for="region in regions"
        :key="region.key"
        :region="region"
        :zoomLevel="zoomLevel"
      />
    </div>
    <svg ref="svgRef" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3840 3024" version="1.1">
      <path
        v-for="region in regions"
        :key="region.key"
        :d="region.d"
        :style="{ fill: region.province.fill, opacity: 0.6 }"
      />
    </svg>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from "@vue/composition-api";
import MapMarkerIcon from "@/components/MapMarkerIcon.vue";
import { L, createIcon } from "./util";
import { useGsap } from "@/use/gsap";
import regions from "@/data/regions.json";

// import { useLeaflet } from '@/use/leaflet';

export default {
  components: {
    MapMarkerIcon
  },
  props: {
    path: String
  },
  setup(props) {
    const state = reactive({
      mapRef: null,
      markersRef: null,
      svgRef: null,
      zoomLevel: 'high'
    });

    let map = null;

    const { gsap } = useGsap();
    const fadeInImage = () => gsap.to(map._container, 2, { opacity: 1 });
    watch(
      () => state.zoomLevel,
      () => gsap.fromTo(map._panes.markerPane, { opacity: 0 }, { opacity: 1, duration: 0.5 }),
      { lazy: true }
    );

    // useLeaflet();

    onMounted(() => {
      const bounds = [[0,0], [3024,3840]];

      map = L.map(state.mapRef, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        attributionControl: false,
        maxBounds: bounds
      });

      const imageLayer = L.imageOverlay(props.path, bounds).addTo(map);
      imageLayer.on('load', fadeInImage);

      const regionsLayer = L.svgOverlay(state.svgRef, [[0,0], [3024,3840]]).addTo(map);

      const reg = Object.values(regions);
      const layer = [];
      state.markersRef.children.forEach((element, i) => {
        const icon = createIcon({ element });
        const { name, settlement } = reg[i];
        const m = L.marker(L.latLng(settlement.y, settlement.x), { icon }).bindPopup(name);
        layer.push(m);
      })

      const layerGroup = L.layerGroup(layer);

      map.addLayer(layerGroup);

      L.control.layers({

      }, {
        'Provinces': regionsLayer,
        'Resources': layerGroup
      }).addTo(map);

      map.fitBounds(bounds);

      map.on('zoomend', (e) => e.target._zoom < -1 ? state.zoomLevel = "high" : state.zoomLevel = "low");
    });

    return {
      ...toRefs(state),
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

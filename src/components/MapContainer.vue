<template>
  <div style="opacity: 0;" ref="mapRef" class="map">
    <div ref="markersRef" id="markers">
      <MapMarkerIcon
        v-for="region in regions"
        :key="region.key"
        :region="region"
        :zoomLevel="zoomLevel"
        :style="{ opacity }"
      />
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, toRefs, watch } from "@vue/composition-api";
import MapMarkerIcon from "@/components/MapMarkerIcon.vue";
import { L, createIcon } from "./util";
import { useGsap } from "@/use/gsap";
import regions from "@/data/regions.json";

export default {
  components: {
    MapMarkerIcon
  },
  props: {
    path: String
  },
  setup(props) {
    const mapRef = ref(null);
    const markersRef = ref(null);

    const zoomLevel = ref("high");

    const { gsap, animateOpacity } = useGsap();
    const state = reactive({
      opacity: 0
    });
    watch(zoomLevel, animateOpacity(state)); // fade-in icons on zoomLevel change
    const fadeInImage = () => gsap.to(mapRef.value, 2, { opacity: 1 }); // fade-in onload svg image

    onMounted(() => {
      const bounds = [[0,0], [3024,3840]];

      const map = L.map(mapRef.value, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        attributionControl: false,
        maxBounds: bounds
      });

      const imageLayer = L.imageOverlay(props.path, bounds).addTo(map);
      imageLayer.on('load', fadeInImage);

      // markersRef.value.children.forEach((element, i) => {
      //   const icon = createIcon({ element });
      //   const { name, settlement } = reg[i];
      //   L.marker(L.latLng(settlement.y, settlement.x), { icon }).addTo(map).bindPopup(name);
      // });

      const reg = Object.values(regions);
      const layer = [];
      markersRef.value.children.forEach((element, i) => {
        const icon = createIcon({ element });
        const { name, settlement } = reg[i];
        const m = L.marker(L.latLng(settlement.y, settlement.x), { icon }).bindPopup(name);
        layer.push(m);
      })

      const layerGroup = L.layerGroup(layer);

      map.addLayer(layerGroup);

      L.control.layers({}, { 'Resources': layerGroup }).addTo(map);

      map.fitBounds(bounds);

      map.on('zoomend', (e) => e.target._zoom < -1 ? zoomLevel.value = "high" : zoomLevel.value = "low");
    });

    return {
      mapRef,
      markersRef,

      regions,
      zoomLevel,

      ...toRefs(state),
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

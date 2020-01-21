<template>
  <MapCssLayer v-if="mapMatrix">
    <MapCssLayerNode class="node"
      v-for="region in regions"
      :key="region.key"
      :mapMatrix="mapMatrix"
      :coords="region.settlement"
      :offset="{ x: 25, y: 25 }"
    >
      <MapCssLayerSettlementMarker
        :region="region"
        :zoomLevel="zoomLevel"
      />
    </MapCssLayerNode>
  </MapCssLayer>
</template>

<script>
import MapCssLayer from "@/components/MapCssLayer";
import MapCssLayerNode from "@/components/MapCssLayerNode";
import MapCssLayerSettlementMarker from "@/components/MapCssLayerSettlementMarker";

import regions from "@/data/regions.json";

export default {
  components: {
    MapCssLayer,
    MapCssLayerNode,
    MapCssLayerSettlementMarker
  },
  props: {
    mapMatrix: SVGMatrix,
    zoomLevel: String
  },
  setup() {
    return {
      regions
    }
  }
};
</script>

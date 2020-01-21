<template>
  <div style="opacity: 0;" ref="container" class="map-container">

    <MapCssLayerSettlement
      :style="[overlayTransform, { opacity }]"
      :mapMatrix="zoomMatrix"
      :zoomLevel="zoomLevel"
    />

    <svg ref="svg" class="svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <g class="svg-pan-zoom_viewport">
        <image
          @load="fadeInImage"
          :href="path"
          width="3840"
          height="3024"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { computed, reactive, ref, watch, toRefs } from "@vue/composition-api";
import { useSvgpanzoom } from "@/use/svgpanzoom";
import { useGsap } from "@/use/gsap";

import MapCssLayerSettlement from "@/components/MapCssLayerSettlement.vue";

export default {
  components: {
    MapCssLayerSettlement
  },
  props: {
    path: String
  },
  setup() {
    const container = ref(null);
    const svg = ref(null);
    const state = reactive({
      opacity: 0
    });

    const { matrix, zoomMatrix, zoomLevel } = useSvgpanzoom(container, svg);

    const overlayTransform = computed(() => {
      if (matrix.value) {
        const e = Math.round(matrix.value.e);
        const f = Math.round(matrix.value.f);

        return {
          transform: `translate3d(${e}px, ${f}px, 0px)`
        };
      } else {
        return {
          transform: `translate3d(0px, 0px, 0px)`
        };
      }
    });

    // data animations
    const { gsap, animateOpacity } = useGsap();
    const fadeInImage = () => gsap.to(container.value, 2, { opacity: 1 }); // fade-in onload svg image
    watch(zoomLevel, animateOpacity(state)); // fade-in icons on zoomLevel change

    return {
      ...toRefs(state),
      container,
      svg,

      zoomMatrix,
      zoomLevel,
      overlayTransform,

      fadeInImage
    };
  }
};
</script>

<style lang="scss" scoped>
.map-container {
  height: 100%;
  overflow-y: hidden;
}

.svg-container {
  display: block;
  width: 100%;
  height: 100%;
  min-width: inherit;
  max-width: inherit;
  min-height: inherit;
  max-height: inherit;
  padding: none;
  margin: none;
}
</style>

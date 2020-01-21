<template>
  <div class="node-css" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";

export default {
  props: {
    mapMatrix: SVGMatrix,
    coords: Object,
    offset: Object,
  },
  setup(props) {
    const style = computed(() => {
      const { mapMatrix, coords, offset } = props;

      if (mapMatrix) {
        const x = Math.round(coords.x * mapMatrix.a - offset.x);
        const y = Math.round(coords.y * mapMatrix.d - offset.y - (offset.y * mapMatrix.d));
        return { transform: `translate3d(${x}px, ${y}px, 0px)` };
      } else {
        return { transform: "translate3d(0px, 0px, 0px)" };
      }
    });

    return {
      style
    };
  }
};
</script>

<style lang="scss" scoped>
.node-css {
  pointer-events: auto;
  position: absolute;
  z-index: 5;
}

.node-css:hover {
  z-index: 6;
}
</style>

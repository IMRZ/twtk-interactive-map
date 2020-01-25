<template>
  <svg class="leaflet-interactive" xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox" version="1.1">
    <path
      class="region"
      v-for="region in regions"
      :key="region.key"
      :d="region.d"
      :style="regionStyle && regionStyle(region)"
    />
  </svg>
</template>

<script>
export default {
  props: {
    viewBox: String,
    regions: Array,
    regionStyle: Function
  }
};
</script>

<style lang="scss" scoped>
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

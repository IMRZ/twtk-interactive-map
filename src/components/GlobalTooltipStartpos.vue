<template>
  <div class="startpos">
    <span>{{tooltip.faction.adjective}}</span>
  </div>
</template>

<script>
export default {
  props: {
    tooltip: Object
  }
};
</script>

<style lang="scss" scoped>
.startpos {
  font-family: monospace;
  margin: 10px;
}
</style>

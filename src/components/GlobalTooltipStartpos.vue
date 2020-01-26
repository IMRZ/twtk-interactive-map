<template>
  <div class="startpos">
    <div>
      <span class="label">Name:</span>
      <span>{{tooltip.faction.adjective}}</span>
    </div>
    <div>
      <span class="label">Faction:</span>
      <span>{{tooltip.faction.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tooltip: [Object]
  }
};
</script>

<style lang="scss" scoped>
.startpos {
  font-family: monospace;
  margin: 10px;

  .label {
    display: inline-block;
    min-width: 70px;
  }
}
</style>

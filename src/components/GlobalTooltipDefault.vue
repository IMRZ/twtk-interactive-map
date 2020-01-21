<template>
  <pre class="default">{{tooltip.name}}</pre>
</template>

<script>
export default {
  props: {
    tooltip: [String, Object]
  }
};
</script>

<style lang="scss" scoped>
.default {
  margin: 10px;
}
</style>

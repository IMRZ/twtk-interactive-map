<template>
  <pre class="faction">{{tooltip}}</pre>
</template>

<script>
export default {
  props: {
    tooltip: [String, Object]
  }
};
</script>

<style lang="scss" scoped>
.faction {
  margin: 10px;
}
</style>
